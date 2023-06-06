import * as pkg from '../../package.json';
import { EnvironmentType } from './environment-type';

const packageJson = pkg;
// PROD
export const environment: EnvironmentType = {
  production: true,
  appName: 'Binge Mate',
  envName: 'PROD',
  appVersion: packageJson.version,
  apiUrl: 'https://api.bingemate.fr',
  websocketUrl: 'https://api.bingemate.fr',
  auth: {
    clientId: 'angular-frontend',
    realm: 'bingemate',
    url: 'https://auth.bingemate.fr',
  },
};
