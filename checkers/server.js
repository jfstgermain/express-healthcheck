const Promise = require('bluebird');
const prettyHrtime = require('pretty-hrtime');
const os = require('os');

module.exports.check = () =>
  Promise.resolve({
    online: true,
    os: {
      arch: os.arch(),
      loadavg: os.loadavg(),
      freemem: os.freemem(),
      platform: os.platform(),
      totalmem: os.totalmem(),
      uptime: os.uptime(),
      release: os.release(),
    },
    process: {
      execArgv: process.execArgv,
      execPath: process.execPath,
      memoryUsage: process.memoryUsage(),
      pid: process.pid,
      platform: process.platform,
      uptime: process.uptime(),
    },
    uptime: prettyHrtime(process.uptime()),
    status: 'ok',
  });
