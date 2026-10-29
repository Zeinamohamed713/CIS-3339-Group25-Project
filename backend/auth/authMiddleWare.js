// Authentication and authorization middleware.
// requireAuth verifies that the request has a valid JWT.
// requireRole checks whether the authenticated user has the required role.

const jwt = require('jsonwebtoken');

// Verify that the request contains a valid JWT.
function requireAuth(req, res, next) {
  const authHeader = req.header('Authorization');

  // Authorization header must exist and use Bearer authentication.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // JWT contains:
    // username
    // role
    // orgId
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
}

// Verify that the authenticated user has the required role.
function requireRole(requiredRole) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        error: 'Forbidden'
      });
    }

    next();
  };
}

module.exports = {
  requireAuth,
  requireRole
};