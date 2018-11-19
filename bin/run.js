'use strict';
const config = require('../config');
const log = config.log();
const request = require('superagent');
const service = require('../server/service')(config);
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
  log.info(`HEPA-Weather is listening on ${server.address().port} in ${service.get('env')} mode.`);

  const announce = () => {
    request.put(`http://127.0.0.1:3000/service/weather/${server.address().port}`, (err, res) => {
      if(err) {
        log.debug(err);
        log.info('Error connecting to Hepa'); 
      }
    });
  };
  announce();
  setInterval(announce, 15*1000);
});