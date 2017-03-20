/* global describe before after chai Promise */
/* eslint-env node, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
const request = require('supertest');
const express = require('express');
const healthCheck = require('../../');


describe('The health check module', function () {
  let server;

  before(function (cb) {
    server = express();
    server.listen(() => {
      healthCheck.registerRoutes({ server });
      cb();
    });
  });

  // after(function () {
  //   server.close();
  // });

  describe('GET /diagnostics/v1/ping', function () {
    before(function () {
      return request(server)
        .get('/diagnostics/v1/ping')
        .expect(200)
        .then((res) => {
          expect(res.text).to.equal('pong');
        });
    });

    it('should', function () {
      expect(true).to.be.true;
    });
  });

  describe('GET /diagnostics/v1/check', function () {
    before(function () {
      return request(server)
        .get('/diagnostics/v1/check')
        .expect(200)
        .then((res) => {
          expect(res.text).to.equal('pong');
        });
    });

    it('should', function () {
      expect(true).to.be.true;
    });
  });
});
