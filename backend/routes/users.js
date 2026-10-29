// API endpoints for interacting with the users collection

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { users } = require('../models/models');

// ------------------------------------------------------
// POST login
// ------------------------------------------------------

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Require both login fields
    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required'
      });
    }

    // Login is scoped to the organization configured
    // for this deployment.
    const user = await users.findOne({
      username: username,
      org: process.env.ORG_ID
    });

    // Use the same message whether the username
    // or password is incorrect.
    if (!user) {
      return res.status(401).json({
        error: 'Invalid username or password'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid username or password'
      });
    }

    // Information placed inside the JWT
    const payload = {
      username: user.username,
      role: user.role,
      orgId: user.org.toString()
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    );

    return res.json({
      token
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;