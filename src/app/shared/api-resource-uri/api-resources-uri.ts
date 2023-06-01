import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  HTTP_BIN: env.apiUrl + '/httpbin',
  // Media Indexer
  MEDIA_INDEXER: `${env.apiUrl}/media-indexer`,
  // STREAMING: `${env.apiUrl}/streaming`,
  STREAMING: `${env.apiUrl}/streaming-service`,
  // Media info
  MEDIA_INFO: `${env.apiUrl}/media-service`,
  // Users
  USERS: `${env.apiUrl}/users`,
  USERS_SEARCH: `${env.apiUrl}/users/search`,
  // KEYCLOAK_SERVICE: `${env.apiUrl}/keycloak-service`,
  KEYCLOAK_SERVICE: `http://localhost:8081/keycloak-service`,
};
