import type { APIRoute } from 'astro';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_KEY = import.meta.env.GOOGLE_SECRET_KEY;
const JWT_SECRET = import.meta.env.JWT_SECRET;
const HOST = import.meta.env.HOST;

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `${HOST}/api/auth/callback`,
});

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
    
  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 });
  }
  console.log(authHeader);
//   console.log(JWT_SECRET);



  try {
    const user = jwt.verify(authHeader, JWT_SECRET);
    console.log(user);

    client.setCredentials({
        access_token: user.google_access_token  
      });

    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    });
    console.log(userInfo);
    
    return new Response(JSON.stringify(userInfo.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
    return new Response('Forbidden', { status: 403 });
  }
}