const winston = require('winston');
const config = require('better-config');

config.set('../config.json');

const logger = winston.createLogger({
    level: config.get('logLevel'),
    format: winston.format.json(),
    defaultMeta: { service: 'vicomma-chat' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}

module.exports = logger