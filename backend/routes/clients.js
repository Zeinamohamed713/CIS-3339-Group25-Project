// API endpoints for the clients collection

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const {
  requireAuth,
  requireRole
} = require('../auth/authMiddleWare');

const withOrg = require('../auth/withOrg');

const {
  clients,
  events
} = require('../models/models');

// Escape user-entered text before putting it into a regular expression
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ------------------------------------------------------
// GET all clients for the logged-in user's organization
// ------------------------------------------------------

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const clientList = await clients.find(
      withOrg({}, req, 'orgs')
    );

    return res.json(clientList);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET clients grouped by zip code for dashboard
// ------------------------------------------------------

router.get('/byzip', requireAuth, async (req, res, next) => {
  try {
    const orgId = new mongoose.Types.ObjectId(
      req.user.orgId
    );

    const data = await clients.aggregate([
      {
        $match: {
          orgs: orgId,
          'address.zip': {
            $exists: true,
            $ne: ''
          }
        }
      },
      {
        $group: {
          _id: '$address.zip',
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET clients using search criteria
// ------------------------------------------------------

router.get('/search', requireAuth, async (req, res, next) => {
  try {
    const dbQuery = withOrg({}, req, 'orgs');
    const queryArray = [];

    switch (req.query.searchBy) {
      case 'name': {
        if (req.query.firstName) {
          const firstNameRegex = new RegExp(
            `.*${escapeRegex(req.query.firstName)}.*`,
            'i'
          );

          queryArray.push({
            firstName: {
              $regex: firstNameRegex
            }
          });
        }

        if (req.query.lastName) {
          const lastNameRegex = new RegExp(
            `.*${escapeRegex(req.query.lastName)}.*`,
            'i'
          );

          queryArray.push({
            lastName: {
              $regex: lastNameRegex
            }
          });
        }

        break;
      }

      case 'number': {
        if (req.query.phoneNumber) {
          const phoneNumberRegex = new RegExp(
            `.*${escapeRegex(req.query.phoneNumber)}.*`,
            'i'
          );

          queryArray.push({
            'phoneNumber.primary': {
              $regex: phoneNumberRegex
            }
          });
        }

        break;
      }

      default:
        return res.status(400).json({
          error: 'Invalid search type'
        });
    }

    if (queryArray.length > 0) {
      dbQuery.$and = queryArray;
    }

    const data = await clients.find(dbQuery);

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET one client by ID
// ------------------------------------------------------

router.get('/id/:id', requireAuth, async (req, res, next) => {
  try {
    const client = await clients.findOne(
      withOrg(
        {
          _id: req.params.id
        },
        req,
        'orgs'
      )
    );

    if (!client) {
      return res.status(404).json({
        error: 'Client not found'
      });
    }

    return res.json(client);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// POST create client
// Editor only
// ------------------------------------------------------

router.post(
  '/',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const newClient = {
        ...req.body,

        // Never trust an organization supplied by the browser.
        // Always use the organization from the authenticated JWT.
        orgs: [req.user.orgId]
      };

      await clients.create(newClient);

      return res.status(201).json({
        message: 'New client created successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// PUT update client
// Editor only
// ------------------------------------------------------

router.put(
  '/update/:id',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      // Prevent a browser request from changing organization ownership
      const updatedClient = {
        ...req.body
      };

      delete updatedClient.orgs;
      delete updatedClient.org;

      const client = await clients.findOneAndUpdate(
        withOrg(
          {
            _id: req.params.id
          },
          req,
          'orgs'
        ),
        updatedClient,
        {
          new: true,
          runValidators: true
        }
      );

      if (!client) {
        return res.status(404).json({
          error: 'Client not found'
        });
      }

      return res.json({
        message: 'Client updated successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// DELETE client
// Editor only
//
// Client can only be deleted when not registered
// for any event in the same organization.
// ------------------------------------------------------

router.delete(
  '/:id',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const client = await clients.findOne(
        withOrg(
          {
            _id: req.params.id
          },
          req,
          'orgs'
        )
      );

      if (!client) {
        return res.status(404).json({
          error: 'Client not found'
        });
      }

      const clientEvents = await events.find(
        withOrg(
          {
            attendees: req.params.id
          },
          req
        )
      );

      if (clientEvents.length > 0) {
        return res.status(406).json({
          error:
            "Client is signed up for events and can't be deleted."
        });
      }

      const deletedClient = await clients.findOneAndDelete(
        withOrg(
          {
            _id: req.params.id
          },
          req,
          'orgs'
        )
      );

      if (!deletedClient) {
        return res.status(404).json({
          error: 'Client not found'
        });
      }

      return res.json({
        message: 'Client deleted successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;