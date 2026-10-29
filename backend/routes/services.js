// API endpoints for interacting with the services collection

const express = require('express');
const router = express.Router();

const {
  requireAuth,
  requireRole
} = require('../auth/authMiddleWare');

const withOrg = require('../auth/withOrg');

const {
  services,
  events
} = require('../models/models');

// Escape user-entered text before using it in a regular expression
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ------------------------------------------------------
// GET all services for logged-in user's organization
// ------------------------------------------------------

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const serviceList = await services
      .find(withOrg({}, req))
      .sort({ name: 1 });

    return res.json(serviceList);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET services based on search criteria
// ------------------------------------------------------

router.get('/search', requireAuth, async (req, res, next) => {
  try {
    const dbQuery = withOrg({}, req);

    switch (req.query.searchBy) {
      case 'name': {
        const name = req.query.name || '';

        dbQuery.name = {
          $regex: escapeRegex(name),
          $options: 'i'
        };

        break;
      }

      case 'description': {
        const description = req.query.description || '';

        dbQuery.description = {
          $regex: escapeRegex(description),
          $options: 'i'
        };

        break;
      }

      default:
        return res.status(400).json({
          error: 'Invalid search type'
        });
    }

    const data = await services.find(dbQuery);

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET single service by ID
// ------------------------------------------------------

router.get('/id/:id', requireAuth, async (req, res, next) => {
  try {
    const service = await services.findOne(
      withOrg(
        {
          _id: req.params.id
        },
        req
      )
    );

    if (!service) {
      return res.status(404).json({
        error: 'Service not found'
      });
    }

    return res.json(service);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// POST create service
// Editor only
// ------------------------------------------------------

router.post(
  '/',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const newService = {
        ...req.body,

        // Always take organization ownership from JWT
        org: req.user.orgId
      };

      await services.create(newService);

      return res.status(201).json({
        message: 'New service created successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// PUT update service
// Editor only
// ------------------------------------------------------

router.put(
  '/update/:id',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const updatedService = {
        ...req.body
      };

      // Prevent browser from changing organization ownership
      delete updatedService.org;
      delete updatedService.orgs;

      const service = await services.findOneAndUpdate(
        withOrg(
          {
            _id: req.params.id
          },
          req
        ),
        updatedService,
        {
          new: true,
          runValidators: true
        }
      );

      if (!service) {
        return res.status(404).json({
          error: 'Service not found'
        });
      }

      return res.json({
        message: 'Service updated successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// DELETE service
// Editor only
//
// A service cannot be deleted if an event in the same
// organization is currently using it.
// ------------------------------------------------------

router.delete(
  '/:id',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const service = await services.findOne(
        withOrg(
          {
            _id: req.params.id
          },
          req
        )
      );

      if (!service) {
        return res.status(404).json({
          error: 'Service not found'
        });
      }

      const serviceEvents = await events.find(
        withOrg(
          {
            services: req.params.id
          },
          req
        )
      );

      if (serviceEvents.length > 0) {
        return res.status(400).json({
          error:
            'Service cannot be deleted because it is being used by events.'
        });
      }

      const deletedService = await services.findOneAndDelete(
        withOrg(
          {
            _id: req.params.id
          },
          req
        )
      );

      if (!deletedService) {
        return res.status(404).json({
          error: 'Service not found'
        });
      }

      return res.json({
        message: 'Service deleted successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;