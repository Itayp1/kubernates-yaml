const fs = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');

const deployment = async (env, name, path = './') => {
  const deployment = fs.readFileSync('./Deployment.yaml', 'utf8');
  const deploymentObj = yaml.load(deployment);
  deploymentObj.metadata = { name, namespace: env };
  deploymentObj.spec.selector.matchLabels.app = name;
  deploymentObj.spec.template.metadata.labels.app = name;
  deploymentObj.spec.template.spec.containers[0].name = name;
  deploymentObj.spec.template.spec.containers[0].image = `itayp/${name}`;
  const enviromentsPath = join(path, `environment-${env}.yaml`);

  const configuration = fs.readFileSync(enviromentsPath, 'utf8');
  const { environments } = yaml.load(configuration);
  var environmentsArr = Object.entries(environments).map((currenObj) => {
    return { name: currenObj[0], value: currenObj[1] };
  });
  deploymentObj.spec.template.spec.containers[0].env = environmentsArr;
  const yamlConf = yaml.dump(deploymentObj, { forceQuotes: true, quotingType: '"' });
  fs.writeFileSync('Deployment.yaml', yamlConf, 'utf8');
};

module.exports = deployment;
