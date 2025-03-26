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

//http://localhost:4321/api/auth/callback?code=4%2F0AQSTgQG3A6PYUclTEGGv9OaU0jvI9grSKskasOwbzWQrTuDEG7KH9xH57Og9X4lKcTkKQQ&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    
  const code = url.searchParams.get('code');
  console.log(url.searchParams)
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
   

    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    });

    console.log(tokens);

    const token = jwt.sign({
        ...userInfo.data,
        google_access_token: tokens.access_token  // 保存 Google 的 access_token
      }, JWT_SECRET);
    /*
     data: {
    sub: '106081156912681225810',
    name: 'darren li',
    given_name: 'darren',
    family_name: 'li',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKtUXei9aUmB1xfzunlg0RRlsF2IhQxmVcC2ohnUrR-fUcFpR8k=s96-c',
    email: 'darren94me@gmail.com',
    email_verified: true
  },
    */
    console.log(userInfo);
    console.log(token);

    return new Response('', {
      status: 302,
      headers: {
        'Location': '/?token=' + token,
        'Set-Cookie': `token=${token}; Path=/; HttpOnly`
      }
    });
  } catch (error) {
    return new Response('Error fetching Google user info', { status: 400 });
  }
}