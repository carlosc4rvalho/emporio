const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/request.log');

const loggerMiddleware = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} ${req.method} ${req.url}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });

  next();
};

module.exports = loggerMiddleware;