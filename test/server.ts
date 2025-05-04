import { setupServer } from 'msw/node';
import { http } from 'msw';

export const server = setupServer(
  http.get('https://icon.horse/icon/github.com', () => {
    return new Response(new ArrayBuffer(10), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  })
);