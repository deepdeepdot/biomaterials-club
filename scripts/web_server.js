// @ts-check
import server from './utils/minimalHttpServer.js';
import project from '../config/project.json' assert { type: 'json' };

let { dir, port } = project['web_server'];

let serverUp = () => {
  console.log(`server up ${port}`);
};

server(dir)(port)(serverUp);
