// API endpoints for interacting with the org collection

const express = require('express');
const router = express.Router();

const {
  orgs
} = require('../models/models');

// ------------------------------------------------------
// GET configured organization
// ------------------------------------------------------

router.get('/', async (req, res, next) => {
  try {
    const organization = await orgs.findOne({
      _id: process.env.ORG_ID
    });

    if (!organization) {
      return res.status(404).json({
        error: 'Organization not found'
      });
    }

    // Keep existing frontend response format
    return res.json(organization.name);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;