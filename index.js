const Promise = require('bluebird');
const _ = require('lodash');
const checkers = require('./checkers');
console.error(checkers);
const routeRegistrations = {
  info: ({ server, routePrefix = '/diagnostics/v1' } = options) => {
    server.get(`${routePrefix}/info`, (req, res) => {
      res.sendStatus(200);
    });
  },
  ping: ({ server, routePrefix = '/diagnostics/v1' } = options) => {
    server.get(`${routePrefix}/ping`, (req, res) => {
      res.status(200).send('pong');
    });
  },
  check: ({ server, routePrefix = '/diagnostics/v1', checkersOptions = {} } = options) => {
    server.get(`${routePrefix}/check`, (req, res) => {
      const promises = [];

      _.forEach(checkers, (checker, name) => {
        promises.push(checker.check(checkersOptions[name]));
      });
      Promise.all(promises).then(statuses => res.json(statuses));
    });
  },
};

module.exports = {
  registerRoutes: (options) => {
    _.values(routeRegistrations).forEach((registerRouteFn) => {
      registerRouteFn(options);
    });
  },
};

// module.exports
