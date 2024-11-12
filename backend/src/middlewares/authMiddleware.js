// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'F0Z8J1bV6pL8iQmY9cWzR7aT5nK3vXlY';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Token não fornecido.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    req.user = user;
    next();
  });
}

function generateToken(userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
  return token;
}

module.exports = {
  authenticateToken,
  generateToken
};