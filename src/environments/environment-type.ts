export type EnvironmentType = {
  production: boolean;
  appName: string;
  envName: string;
  appVersion: string;
  apiUrl: string;
  messagingWebsocketUrl: string;
  watchWebsocketUrl: string;
  streamingBucketUrl: string;
  auth: {
    clientId: string;
    realm: string;
    url: string;
  };
};
