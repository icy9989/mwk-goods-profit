const app = require('./src/app');
const logger = require('./src/logger/logger');
const PORT = process.env.PORT || 5000;

const start = (port) => {
  process.env.TZ = 'Asia/Yangon';
  try {
    app.listen(port, () => {
      logger.info(`Api running at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error(`Error in server file : ${err}`);
    process.exit(1);
  }
};

start(PORT);

module.exports = {
  app
};
