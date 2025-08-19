const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Access Denied');

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).send('Token missing');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
};

module.exports = authenticateToken;
