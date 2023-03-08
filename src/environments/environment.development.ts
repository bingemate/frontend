import * as pkg from '../../package.json';
import { EnvironmentType } from './environment-type';

const packageJson = pkg;

export const environment: EnvironmentType = {
  production: false,
  appName: 'Binge Mate',
  envName: 'DEV',
  appVersion: packageJson.version,
  apiUrl: 'https://api-dev.bingemate.fr',
};
