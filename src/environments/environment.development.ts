import * as pkg from '../../package.json';
import { EnvironmentType } from './environment-type';

const packageJson = pkg;

export const environment: EnvironmentType = {
  production: false,
  appName: 'Binge Mate',
  envName: 'DEV',
  appVersion: packageJson.version,
  apiUrl: 'https://api.bingemate.fr/dev',
  websocketUrl: 'https://api.bingemate.fr',
  auth: {
    clientId: 'angular-frontend',
    realm: 'bingemate-dev',
    url: 'https://auth.bingemate.fr',
  },
};
