const bulk = require('bulk-require');
const newman = require('newman');
const path = require('path');
const argv = require('yargs')
  .boolean('bail')
  .string('folder')
  .boolean('insecure')
  .alias('k', 'insecure')
  .string('reporters')
  .default('reporters', 'cli')
  .alias('r', 'reporters')
  .default('delay-request', 0)
  .default('timeout-request', 2000)
  .argv;

const baseDir = path.join(__dirname, '../postman');
const { collections, environments } = bulk(baseDir, [
  'collections/*.json',
  'environments/*.json'
]);

const environment = environments[process.env.NODE_ENV];

Object.keys(collections).forEach(file => {
  console.info(`Running tests for ${file}.json`);
  newman.run({
    environment,
    collection: require(`${baseDir}/collections/${file}`),
    insecure: argv.insecure,
    reporters: argv.reporters.split(','),
    timeoutRequest: argv['timeout-request']
  }, (err, { run }) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else if (run.failures && run.failures.length > 0) {
      process.exit(1);
    }
  });
});