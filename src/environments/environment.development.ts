import * as pkg from '../../package.json';
import { EnvironmentType } from './environment-type';

const packageJson = pkg;

export const environment: EnvironmentType = {
  production: false,
  appName: 'Binge Mate',
  envName: 'DEV',
  appVersion: packageJson.version,
  apiUrl: 'https://api.bingemate.fr/dev',
  messagingWebsocketUrl: 'https://ws-messaging-dev.bingemate.fr',
  watchWebsocketUrl: 'https://ws-watch-dev.bingemate.fr',
  streamingBucketUrl: 'https://bingemate-dev.s3.fr-par.scw.cloud',
  auth: {
    clientId: 'angular-frontend',
    realm: 'bingemate-dev',
    url: 'https://auth.bingemate.fr',
  },
};
