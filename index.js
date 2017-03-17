const Promise = require('bluebird');
const _ = require('lodash');
const checkers = require('./checkers');

const routeRegistrations = {
  info: ({ express, routePrefix = '/diagnostics/v1' } = options) => {
    express.get(`${routePrefix}/info`, (req, res) => {
      res.sendStatus(200);
    });
  },
  ping: ({ express, routePrefix = '/diagnostics/v1' } = options) => {
    express.get(`${routePrefix}/ping`, (req, res) => {
      res.status(200).send('pong');
    });
  },
  check: ({ express, routePrefix = '/diagnostics/v1', checkersOptions } = options) => {
    express.get(`${routePrefix}/check`, (req, res) => {
      Promise.props(_.mapValues(checkersOptions, (checker) => {
        checkers[checker].check(checkersOptions[checker]);
      })).then(statuses => res.json(statuses));
    });
  },
};

function registerRoutes (options) {
  _(routeRegistrations).values().forEach((registerRouteFn) => {
    registerRouteFn(options);
  });
}

// module.exports
