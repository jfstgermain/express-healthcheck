const amqp = require('./amqp');
const mongo = require('./mongo-db');
const oracle = require('./oracle-db');
const server = require('./server');

module.export = {
  amqp,
  mongo,
  oracle,
  server,
};
