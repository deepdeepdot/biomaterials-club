// @ts-check

import fs from 'fs';
import { server } from './utils/minimalHttpServer.js';

const CONFIG = './config/project.json';
let project = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'));

let { dir, port } = project['web_server'];

let serverUp = () => {
  /* eslint-disable no-console */
  console.log(`server up ${port}`);
  /* eslint-enable no-console */
};

server(dir)(port)(serverUp);
