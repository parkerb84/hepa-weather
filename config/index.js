require('dotenv').config();
const bunyan = require('bunyan');

const log = {
  development: () => {
    return bunyan.createLogger({name: 'HEPA-WEATHER-development', level: 'debug'});
  },
  production: () => {
    return bunyan.createLogger({name: 'HEPA-WEATHER-production', level: 'info'});
  },
  test: () => {
    return bunyan.createLogger({name: 'HEPA-WEATHER-test', level: 'fatal'});
  }
};

module.exports = {
  weatherToken: process.env.WEATHER_TOKEN,
  log: (env) => {
    if(env) return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};