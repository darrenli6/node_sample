import type { APIRoute } from 'astro';
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_KEY = import.meta.env.GOOGLE_SECRET_KEY;
const HOST = import.meta.env.HOST;

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `${HOST}/api/auth/callback`,
});

export const POST: APIRoute = async () => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
  
  return new Response('', {
    status: 302,
    headers: {
      'Location': authorizeUrl
    }
  });
}