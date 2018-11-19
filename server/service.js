'use strict';

const express = require('express');
const service = express();
const request = require('superagent');

module.exports = (config) => {
  const log = config.log();
  service.get('/service/:location', (req, res) => {
      
    request.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&APPID=${config.weatherToken}&units=metric`, 
      (err, response) => {

        if (err) {
          log.error(err);
          return res.sendStatus(404);
        }

        res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});

      });
  });

  return service;
};