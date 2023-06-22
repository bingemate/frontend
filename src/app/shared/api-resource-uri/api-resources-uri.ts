import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  HTTP_BIN: env.apiUrl + '/httpbin',
  // Media Indexer
  MEDIA_INDEXER: `${env.apiUrl}/media-indexer`,
  // STREAMING: `${env.apiUrl}/streaming`,
  // STREAMING: `${env.apiUrl}/streaming-service`,
  // Media info
  MEDIA_INFO: `${env.apiUrl}/media-service`,
  // Users
  USER_SERVICE: `${env.apiUrl}/user-service`,
  KEYCLOAK_SERVICE: `${env.apiUrl}/keycloak-service`,
  // KEYCLOAK_SERVICE: `http://localhost:8081/keycloak-service`,
  PAYMENT_SERVICE: `${env.apiUrl}/payment-service`,
  WATCH_SERVICE: `${env.apiUrl}/watch-service`,
};
