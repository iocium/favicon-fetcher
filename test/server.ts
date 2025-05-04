import { setupServer } from 'msw/node';
import { http } from 'msw';

export const server = setupServer(
  http.get('https://www.google.com/s2/favicons', ({ request }) => {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain')

    if (!domain) {
      return new Response(null, { status: 404 })
    }

    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }),
  http.get('https://icons.duckduckgo.com/ip3/reddit.com.ico', ({ request }) => {
    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }),
  http.get('https://icons.bitwarden.net/facebook.com/icon.png', ({ request }) => {
    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }),
  http.get('https://favicon.yandex.net/favicon/cloudflare.com', ({ request }) => {
    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }),
  http.get('https://www.fastmailcdn.com/avatar/joosup.com', ({ request }) => {
    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }),
  http.get('https://icon.horse/icon/github.com', () => {
    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }),

);