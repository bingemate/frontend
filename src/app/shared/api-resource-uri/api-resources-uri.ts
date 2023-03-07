import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  // Auth
  AUTH: `${env.apiUrl}/auth`,
  AUTH_ME: `${env.apiUrl}/auth/me`,
  // Users
  USERS: `${env.apiUrl}/users`,
  USERS_SEARCH: `${env.apiUrl}/users/search`,
};
