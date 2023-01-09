// @ts-check
import server from './utils/minimal-http-server.js';
import config from '../config/server.json' assert { type: 'json' };

// May want to consider overrideable arguments using minimist
const { dir, port } = config;

const serverUp = () => {
  console.log('server up ' + port);
};

server(dir)(port)(serverUp);
