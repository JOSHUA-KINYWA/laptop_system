const jwt = require('jsonwebtoken');

/**
 * Authentication middleware to verify JWT and enforce optional role-based access.
 * @param {string|string[]=} requiredRole - Single role or array of allowed roles
 * @returns {Function} Express middleware
 */
function authMiddleware(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ✅ Validate Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '🔒 No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach user info from token to request
      req.user = {
        id: decoded.id,
        role: decoded.role,
        ...(decoded.year && { year: decoded.year }) // Optional: only add if exists
      };

      // ✅ Role check if required
      if (requiredRole) {
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: '🚫 Access denied: insufficient permissions' });
        }
      }

      next(); // ✅ Pass to next middleware or route
    } catch (err) {
      console.error('❌ Auth error:', err.message);
      return res.status(401).json({ message: '❌ Invalid or expired token' });
    }
  };
}

module.exports = authMiddleware;
