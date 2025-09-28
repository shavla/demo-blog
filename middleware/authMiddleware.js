import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided.',
      error: 'NO_TOKEN'
    });
  }

  // Ensure JWT_SECRET exists
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error('JWT_SECRET not found in environment variables');
    return res.status(500).json({
      message: 'Server configuration error'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Optional: Add additional validation
    if (!decoded.userId || !decoded.email) {
      return res.status(403).json({
        message: 'Invalid token payload',
        error: 'INVALID_PAYLOAD'
      });
    }

    req.user = decoded;
    next();

  } catch (err) {
    // More specific error handling
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token has expired',
        error: 'TOKEN_EXPIRED'
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({
        message: 'Invalid token',
        error: 'INVALID_TOKEN'
      });
    } else {
      return res.status(403).json({
        message: 'Token verification failed',
        error: 'VERIFICATION_FAILED'
      });
    }
  }
}