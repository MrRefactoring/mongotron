'use strict';

const _ = require('underscore');
const path = require('path-extra');

const packageJson = require('../../package.json');

const rootPath = path.join(__dirname, '../../');

let appName = packageJson.name.toLowerCase();

const defaultSettings = {
  version: packageJson.version,
  name: packageJson.name,
  website: 'http://mongotron.io/',
  repository: packageJson.repository.url,
  repositoryName: 'mongotron',
  repositoryOwner: 'officert',
  logLevel: 'debug',
  buildPath: 'build',
  releasePath: 'release',
  appConfigDir: path.join(rootPath, `.${appName}`),
  logFilePath: path.join(rootPath, `.${appName}`, 'logs.json'),
  dbConfigPath: path.join(rootPath, `.${appName}`, 'dbConnections.json'),
  keybindingsPath: path.join(rootPath, `.${appName}`, 'keybindings.json'),
  themesPath: path.join(rootPath, `.${appName}`, 'themes.json')
};

const production = _.extend(_.clone(defaultSettings), {
  env: 'production'
});

const development = _.extend(_.clone(defaultSettings), {
  env: 'development'
});

const local = _.extend(_.clone(defaultSettings), {
  env: 'local'
});

const test = _.extend(_.clone(defaultSettings), {
  env: 'test',
  appConfigDir: 'tests/config',
  logFilePath: 'tests/config/logs.json',
  dbConfigPath: 'tests/config/dbConnections.json',
  keybindingsPath: 'tests/config/keybindings.json',
  themesPath: 'tests/config/themes.json'
});

const configs = {
  production: production,
  development: development,
  local: local,
  test: test
};

function getConfig(env) {
  let envConfig = configs[env];

  if (!envConfig) throw new Error(`${env} is not a valid environment`);

  console.log('\nENVIRONMENT\n------------------');
  console.log(envConfig);
  console.log('\n');

  return envConfig;
}

/** @exports AppConfig */
module.exports = getConfig(process.env.NODE_ENV || 'development');
