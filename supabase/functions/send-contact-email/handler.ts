// This legacy endpoint never delivered email. Reject requests without reading
// or recording personal data; the site currently sends through EmailJS.
export function handler(_req: Request): Response {
  return new Response(JSON.stringify({ error: 'Endpoint unavailable' }), {
    status: 410,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}