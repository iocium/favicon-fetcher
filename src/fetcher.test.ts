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

});
