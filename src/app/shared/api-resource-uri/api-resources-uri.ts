import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  HTTP_BIN: env.apiUrl + '/httpbin',
  // Media Indexer
  MEDIA_INDEXER: `${env.apiUrl}/media-indexer`,
  // Users
  USERS: `${env.apiUrl}/users`,
  USERS_SEARCH: `${env.apiUrl}/users/search`,
};
