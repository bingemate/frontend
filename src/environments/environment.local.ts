import * as pkg from '../../package.json';
import { EnvironmentType } from './environment-type';

const packageJson = pkg;

export const environment: EnvironmentType = {
  production: false,
  appName: 'Binge Mate',
  envName: 'LOCAL',
  appVersion: packageJson.version,
  apiUrl: 'https://api.bingemate.fr/local',
  auth: {
    clientId: 'angular-local-frontend',
    realm: 'bingemate-local',
    url: 'https://auth.bingemate.fr',
  },
};
