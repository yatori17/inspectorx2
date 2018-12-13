// src/app/auth/auth.config.ts
import { ENV } from './../core/env.config';

interface AuthUsers {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
}

export const AUTH_USERS: AuthUsers = {
  CLIENT_ID: 'C5PEYOrOle47SswMt9hFE9hcbNE5nkMa',
  CLIENT_DOMAIN: 'inspx2.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:8083/api/v2/users', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile read:user_idp_tokens read:users',
  NAMESPACE: 'http://myapp.com/roles'
};
