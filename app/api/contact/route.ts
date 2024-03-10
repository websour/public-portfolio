export async function POST(request: Request) {
  const body = await request.json();
  const API_URL: string | undefined = process.env.MICROCMS_CONTACT_API_URL || '';
  const API_KEY: string | undefined = process.env.MICROCMS_APIKEY || '';
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });
  const responseData = await response.json();
  return new Response(JSON.stringify(responseData));
}