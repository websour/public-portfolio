import jwt from 'jsonwebtoken';
export async function POST(request: Request) {
  const body = await request.json()
  const { password } = body;
  const API_PASSWORD: string | undefined = process.env.AUTHENTICATION_API_PASSWORD || '';
  const isValid = password === API_PASSWORD;
  if (isValid) {
    const token = jwt.sign({ password }, 'secret', { expiresIn: '1h' });
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
