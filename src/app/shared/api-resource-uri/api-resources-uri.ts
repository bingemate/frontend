import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  HTTP_BIN: 'https://api.bingemate.fr/test/httpbin',
  // Users
  USERS: `${env.apiUrl}/users`,
  USERS_SEARCH: `${env.apiUrl}/users/search`,
};
