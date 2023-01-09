import fs from 'fs';

const VERSION_FILE = 'config/version.txt';

function readTextFile(file) {
  return fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
}

function incrementVersion() {
  let version = readTextFile(VERSION_FILE);

  let idx = version.lastIndexOf('.');
  let lastSuffix = version.substring(idx + 1);
  let incrSuffix = parseInt(lastSuffix, 10) + 1;

  let newVersion = version.substring(0, idx + 1) + incrSuffix;
  fs.writeFileSync(VERSION_FILE, newVersion);

  return newVersion;
}

export default incrementVersion;
