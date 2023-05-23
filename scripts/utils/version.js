// @ts-check
import fs from 'fs';

const VERSION_FILE = './config/project.json';

let project = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf-8'));

function getNewVersion(version) {
  let idx = version.lastIndexOf('.');
  let lastSuffix = version.substring(idx + 1);
  let incrSuffix = parseInt(lastSuffix, 10) + 1;

  let newVersion = version.substring(0, idx + 1) + incrSuffix;
  return newVersion;
}

function updateVersion(version, newVersion) {
  let text = fs.readFileSync(VERSION_FILE, { encoding: 'utf8', flag: 'r' });
  let replaced = text.replace(version, newVersion);
  fs.writeFileSync(VERSION_FILE, replaced);
}

export default function incrementVersion() {
  let { version } = project['create_index_html'];
  let newVersion = getNewVersion(version);
  updateVersion(version, newVersion);
  return newVersion;
}
