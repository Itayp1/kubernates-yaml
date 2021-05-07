const argv = require('yargs')(process.argv.slice(2)).argv;
const deployment = require('./deployment');
const Ingress = require('./Ingress');
const Service = require('./Service');
const encryption = require('./encryption');

const start = async () => {
  const { env, name, operation, domain, path, key, image } = argv;

  switch (operation) {
    case 'encrypt':
      encryption(env, operation);
      break;
    case 'decrypt':
      encryption(env, operation);
      break;

    case 'deployment':
      deployment(env, name, image);

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
