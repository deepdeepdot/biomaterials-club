// @ts-check
import fs from 'fs';
import project from '../../config/project.json' assert { type: 'json' };

const VERSION_FILE = './config/project.json';

function getNewVersion(version) {
  let idx = version.lastIndexOf('.');
  let lastSuffix = version.substring(idx + 1);
  let incrSuffix = parseInt(lastSuffix, 10) + 1;

  let newVersion = version.substring(0, idx + 1) + incrSuffix;
  return newVersion;
}

function incrementVersion() {
  let { version } = project["versioning"];
  let newVersion = getNewVersion(version);
  let text = fs.readFileSync(VERSION_FILE, { encoding: 'utf8', flag: 'r' });
  let replaced = text.replace(version, newVersion);
  fs.writeFileSync(VERSION_FILE, replaced);

  return newVersion;
}

export default incrementVersion;
