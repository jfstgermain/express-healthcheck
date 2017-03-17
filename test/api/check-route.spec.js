/* global describe before after expect */
const request = require('supertest');
const express = require('express');

describe('The UUID API resource', function () {
  let server;

  before(function () {
    server = express();
    return server.listen();
  });

  after(function () {
    server.close();
  });

  describe('GET /diagnostics/v1/check', function () {
    before(function () {
      return request(server)
        .get('/api/gdam/v1/uuid')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).to.not.be.empty;
        });
    });
  });
});
