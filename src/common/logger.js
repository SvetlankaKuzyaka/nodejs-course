const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console({ handleExceptions: true, handleRejections: true }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = logger;
