const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Simulate token validation
    if (token === 'mock-token') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
  
  module.exports = authMiddleware;
  