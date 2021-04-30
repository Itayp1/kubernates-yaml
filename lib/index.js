const argv = require('yargs')(process.argv.slice(2)).argv;
const deployment = require('./deployment');
const Ingress = require('./Ingress');
const Service = require('./Service');

const start = async () => {
  const { env, name, operation, domain, path } = argv;

  switch (operation) {
    case 'deployment':
      deployment(env, name);

      break;
    case 'Ingress':
      Ingress(env, name, domain, path);
      break;
    case 'Service':
      Service(env, name);
      break;
    default:
      break;
  }
};
start();
