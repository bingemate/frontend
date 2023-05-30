export type EnvironmentType = {
  production: boolean;
  appName: string;
  envName: string;
  appVersion: string;
  apiUrl: string;
  websocketUrl: string;

  auth: {
    clientId: string;
    realm: string;
    url: string;
  };
};
