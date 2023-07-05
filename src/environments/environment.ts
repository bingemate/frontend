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
  messagingWebsocketUrl: 'https://ws-messaging.bingemate.fr',
  watchWebsocketUrl: 'https://ws-watch.bingemate.fr',
  streamingBucketUrl: 'https://bingemate.s3.fr-par.scw.cloud',
  auth: {
    clientId: 'angular-frontend',
    realm: 'bingemate',
    url: 'https://auth.bingemate.fr',
  },
};
