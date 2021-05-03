const fs = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');
const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('missing secret key in env');
}

const encryption = async (env, operation) => {
  const enviromentsPath = join('./', `environment-${env}.yaml`);
  const configurationYaml = fs.readFileSync(enviromentsPath, 'utf8');
  const { environments } = yaml.load(configurationYaml);
  for (environment in environments) {
    if (environment.includes('_ENCRYPT')) {
      if (operation == 'encrypt') {
        const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, '@3$^87dfgtesfghj');
        const encrypted = Buffer.concat([cipher.update(environments[environment]), cipher.final()]).toString('base64');
        environments[environment] = encrypted;
      } else {
        const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, '@3$^87dfgtesfghj');
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(environments[environment], 'base64')), decipher.final()]).toString();
        environments[environment] = decrpyted;
      }
    }
  }

  const yamlConf = yaml.dump({ environments }, { forceQuotes: true, quotingType: '"' });
  fs.writeFileSync(`environment-${env}.yaml`, yamlConf, 'utf8');
};

module.exports = encryption;
