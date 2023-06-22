export type EnvironmentType = {
  production: boolean;
  appName: string;
  envName: string;
  appVersion: string;
  apiUrl: string;
  websocketUrl: string;
  streamingBucketUrl: string;
  auth: {
    clientId: string;
    realm: string;
    url: string;
  };
};
