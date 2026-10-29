// API endpoints for interacting with the events collection

const express = require('express');
const router = express.Router();

const {
  requireAuth,
  requireRole
} = require('../auth/authMiddleWare');

const withOrg = require('../auth/withOrg');

const {
  events,
  clients
} = require('../models/models');

// Escape user-entered text before using it in a regular expression
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ------------------------------------------------------
// GET all events for logged-in user's organization
// ------------------------------------------------------

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const eventList = await events
      .find(withOrg({}, req))
      .sort({ date: -1 });

    return res.json(eventList);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET attendance data for dashboard
// Past two months
// ------------------------------------------------------

router.get('/attendance', requireAuth, async (req, res, next) => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const attendanceData = await events
      .find(
        withOrg(
          {
            date: {
              $gte: twoMonthsAgo
            }
          },
          req
        )
      )
      .sort({ date: 1 });

    return res.json(attendanceData);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET events based on search criteria
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

      case 'date': {
        if (!req.query.eventDate) {
          return res.status(400).json({
            error: 'Event date is required'
          });
        }

        const startDate = new Date(req.query.eventDate);

        if (Number.isNaN(startDate.getTime())) {
          return res.status(400).json({
            error: 'Invalid event date'
          });
        }

        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        dbQuery.date = {
          $gte: startDate,
          $lt: endDate
        };

        break;
      }

      default:
        return res.status(400).json({
          error: 'Invalid search type'
        });
    }

    const data = await events
      .find(dbQuery)
      .sort({ date: -1 });

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET events a client is registered for
// ------------------------------------------------------

router.get('/client/:id', requireAuth, async (req, res, next) => {
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

    const data = await events.find(
      withOrg(
        {
          attendees: req.params.id
        },
        req
      )
    );

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET events a client is NOT registered for
// ------------------------------------------------------

router.get(
  '/client/:id/not-registered',
  requireAuth,
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

      const data = await events.find(
        withOrg(
          {
            attendees: {
              $nin: [req.params.id]
            }
          },
          req
        )
      );

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// GET attendee details for an event
// ------------------------------------------------------

router.get('/attendees/:id', requireAuth, async (req, res, next) => {
  try {
    const event = await events.findOne(
      withOrg(
        {
          _id: req.params.id
        },
        req
      )
    );

    if (!event) {
      return res.status(404).json({
        error: 'Event not found'
      });
    }

    const attendeeList = await clients.find(
      withOrg(
        {
          _id: {
            $in: event.attendees
          }
        },
        req,
        'orgs'
      )
    );

    return res.json(attendeeList);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET all events for a given service
// ------------------------------------------------------

router.get('/service/:id', requireAuth, async (req, res, next) => {
  try {
    const eventsWithService = await events
      .find(
        withOrg(
          {
            services: {
              $in: [req.params.id]
            }
          },
          req
        )
      )
      .select({
        _id: 1,
        name: 1,
        date: 1,
        address: {
          line1: 1
        }
      })
      .lean();

    return res.json(eventsWithService);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// GET single event by ID
// ------------------------------------------------------

router.get('/id/:id', requireAuth, async (req, res, next) => {
  try {
    const event = await events.findOne(
      withOrg(
        {
          _id: req.params.id
        },
        req
      )
    );

    if (!event) {
      return res.status(404).json({
        error: 'Event not found'
      });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
});

// ------------------------------------------------------
// POST create new event
// Editor only
// ------------------------------------------------------

router.post(
  '/',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const newEvent = {
        ...req.body,
        org: req.user.orgId
      };

      await events.create(newEvent);

      return res.status(201).json({
        message: 'New event created successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// PUT update event
// Editor only
// ------------------------------------------------------

router.put(
  '/update/:id',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const updatedEvent = {
        ...req.body
      };

      delete updatedEvent.org;
      delete updatedEvent.orgs;

      const event = await events.findOneAndUpdate(
        withOrg(
          {
            _id: req.params.id
          },
          req
        ),
        updatedEvent,
        {
          new: true,
          runValidators: true
        }
      );

      if (!event) {
        return res.status(404).json({
          error: 'Event not found'
        });
      }

      return res.json({
        message: 'Event updated successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// PUT register client for event
// Editor only
// ------------------------------------------------------

router.put(
  '/register',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const eventId = req.query.event;
      const clientId = req.query.client;

      if (!eventId || !clientId) {
        return res.status(400).json({
          error: 'Event and client are required'
        });
      }

      const client = await clients.findOne(
        withOrg(
          {
            _id: clientId
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

      const event = await events.findOne(
        withOrg(
          {
            _id: eventId
          },
          req
        )
      );

      if (!event) {
        return res.status(404).json({
          error: 'Event not found'
        });
      }

      const alreadyRegistered = event.attendees.some(
        attendee =>
          attendee.toString() === clientId.toString()
      );

      if (alreadyRegistered) {
        return res.status(200).json({
          message: 'Already registered'
        });
      }

      await events.findOneAndUpdate(
        withOrg(
          {
            _id: eventId
          },
          req
        ),
        {
          $addToSet: {
            attendees: clientId
          }
        }
      );

      return res.status(200).json({
        message: 'Client added to event'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// PUT deregister client from event
// Editor only
// ------------------------------------------------------

router.put(
  '/deregister',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const eventId = req.query.event;
      const clientId = req.query.client;

      if (!eventId || !clientId) {
        return res.status(400).json({
          error: 'Event and client are required'
        });
      }

      const client = await clients.findOne(
        withOrg(
          {
            _id: clientId
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

      const event = await events.findOne(
        withOrg(
          {
            _id: eventId
          },
          req
        )
      );

      if (!event) {
        return res.status(404).json({
          error: 'Event not found'
        });
      }

      const isRegistered = event.attendees.some(
        attendee =>
          attendee.toString() === clientId.toString()
      );

      if (!isRegistered) {
        return res.status(200).json({
          message: 'Not registered'
        });
      }

      await events.findOneAndUpdate(
        withOrg(
          {
            _id: eventId
          },
          req
        ),
        {
          $pull: {
            attendees: clientId
          }
        }
      );

      return res.status(200).json({
        message: 'Client deregistered from event'
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ------------------------------------------------------
// DELETE event
// Editor only
//
// Event may only be deleted when it has no attendees.
// ------------------------------------------------------

router.delete(
  '/:id',
  requireAuth,
  requireRole('editor'),
  async (req, res, next) => {
    try {
      const event = await events.findOne(
        withOrg(
          {
            _id: req.params.id
          },
          req
        )
      );

      if (!event) {
        return res.status(404).json({
          error: 'Event not found'
        });
      }

      if (event.attendees.length > 0) {
        return res.status(400).json({
          error: "Event has attendees and can't be deleted."
        });
      }

      const deletedEvent = await events.findOneAndDelete(
        withOrg(
          {
            _id: req.params.id
          },
          req
        )
      );

      if (!deletedEvent) {
        return res.status(404).json({
          error: 'Event not found'
        });
      }

      return res.json({
        message: 'Event deleted successfully'
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;