import { FaviconFetcher } from './fetcher';

describe('FaviconFetcher (mocked)', () => {
  it('successfully fetches mocked favicon from google', async () => {
    const fetcher = new FaviconFetcher('bbc.co.uk');
    const result = await fetcher.fetchFavicon('google');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches mocked favicon from duckduckgo', async () => {
    const fetcher = new FaviconFetcher('reddit.com');
    const result = await fetcher.fetchFavicon('duckduckgo');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches mocked favicon from bitwarden', async () => {
    const fetcher = new FaviconFetcher('facebook.com');
    const result = await fetcher.fetchFavicon('bitwarden');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches mocked favicon from yandex', async () => {
    const fetcher = new FaviconFetcher('cloudflare.com');
    const result = await fetcher.fetchFavicon('yandex');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches mocked favicon from fastmail', async () => {
    const fetcher = new FaviconFetcher('joosup.com');
    const result = await fetcher.fetchFavicon('fastmail');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches mocked favicon from icon.horse', async () => {
    const fetcher = new FaviconFetcher('github.com');
    const result = await fetcher.fetchFavicon('iconHorse');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches mocked favicon from nextdns', async () => {
    const fetcher = new FaviconFetcher('temu.com');
    const result = await fetcher.fetchFavicon('nextdns');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
  it('successfully fetches BIMI logo using default DoH resolver', async () => {
    const dummySvg = '<svg></svg>';
    const dummyArrayBuffer = new TextEncoder().encode(dummySvg).buffer;
  
    global.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === 'string' && url.includes('dns-query')) {
        return Promise.resolve(new Response(JSON.stringify({
          Answer: [
            { data: '"v=BIMI1; l=https://example.com/logo.svg;"' }
          ]
        }), { status: 200 }));
      } else if (typeof url === 'string' && url.includes('logo.svg')) {
        return Promise.resolve(new Response(dummyArrayBuffer, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' }
        }));
      }
      return Promise.reject(new Error('Unexpected fetch'));
    }) as jest.Mock;
  
    const fetcher = new FaviconFetcher('example.com');
    const result = await fetcher.fetchFavicon('bimi');
  
    expect(result.url).toBe('https://example.com/logo.svg');
    expect(result.contentType).toBe('image/svg+xml');
    expect(result.status).toBe(200);
  });  
  it('successfully fetches BIMI logo using custom DoH resolver', async () => {
    const dummySvg = '<svg></svg>';
    const dummyArrayBuffer = new TextEncoder().encode(dummySvg).buffer;
  
    global.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === 'string' && url.includes('dns.google')) {
        return Promise.resolve(new Response(JSON.stringify({
          Answer: [
            { data: '"v=BIMI1; l=https://cdn.example.org/logo.svg;"' }
          ]
        }), { status: 200 }));
      } else if (typeof url === 'string' && url.includes('logo.svg')) {
        return Promise.resolve(new Response(dummyArrayBuffer, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' }
        }));
      }
      return Promise.reject(new Error('Unexpected fetch'));
    }) as jest.Mock;
  
    const fetcher = new FaviconFetcher('example.com', {
      dohServerUrl: 'https://dns.google/dns-query'
    });
    const result = await fetcher.fetchFavicon('bimi');
  
    expect(result.url).toBe('https://cdn.example.org/logo.svg');
    expect(result.contentType).toBe('image/svg+xml');
    expect(result.status).toBe(200);
  });  
  it('throws error if no BIMI TXT record is found', async () => {
    global.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === 'string' && url.includes('dns-query')) {
        return Promise.resolve(new Response(JSON.stringify({ Answer: [] }), { status: 200 }));
      }
      return Promise.reject(new Error('Unexpected fetch'));
    }) as jest.Mock;

    const fetcher = new FaviconFetcher('example.com');
    await expect(fetcher.fetchFavicon('bimi')).rejects.toThrow('No BIMI l= logo URL found in TXT record');
  });
  it('throws error if DNS response is malformed', async () => {
    global.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === 'string' && url.includes('dns-query')) {
        return Promise.resolve(new Response('{}', { status: 200 }));
      }
      return Promise.reject(new Error('Unexpected fetch'));
    }) as jest.Mock;
  
    const fetcher = new FaviconFetcher('example.com');
    await expect(fetcher.fetchFavicon('bimi')).rejects.toThrow('No BIMI l= logo URL found in TXT record');
  });
  it('throws error if BIMI logo fetch fails', async () => {
    global.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === 'string' && url.includes('dns-query')) {
        return Promise.resolve(new Response(JSON.stringify({
          Answer: [
            { data: '"v=BIMI1; l=https://cdn.example.com/logo.svg;"' }
          ]
        }), { status: 200 }));
      }
      return Promise.resolve(new Response(null, { status: 404 }));
    }) as jest.Mock;

    const fetcher = new FaviconFetcher('example.com');
    await expect(fetcher.fetchFavicon('bimi')).rejects.toThrow('Failed to fetch BIMI logo');
  });
});
