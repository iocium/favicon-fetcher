import { FaviconFetcher } from './fetcher';

const liveTest = process.env.LIVE_TEST === 'true';

(liveTest ? describe : describe.skip)('FaviconFetcher (live)', () => {
  it('fetches real favicon from google', async () => {
    const fetcher = new FaviconFetcher('bbc.co.uk');
    const result = await fetcher.fetchFavicon('google');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
  it('fetches real favicon from duckduckgo', async () => {
    const fetcher = new FaviconFetcher('reddit.com');
    const result = await fetcher.fetchFavicon('duckduckgo');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
  it('fetches real favicon from bitwarden', async () => {
    const fetcher = new FaviconFetcher('facebook.com');
    const result = await fetcher.fetchFavicon('bitwarden');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
  it('fetches real favicon from yandex', async () => {
    const fetcher = new FaviconFetcher('cloudflare.com');
    const result = await fetcher.fetchFavicon('yandex');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
  it('fetches real favicon from fastmail', async () => {
    const fetcher = new FaviconFetcher('joosup.com');
    const result = await fetcher.fetchFavicon('fastmail');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
  it('fetches real favicon from iconHorse', async () => {
    const fetcher = new FaviconFetcher('github.com');
    const result = await fetcher.fetchFavicon('iconHorse');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
  it('fetches real favicon from nextdns', async () => {
    const fetcher = new FaviconFetcher('temu.com');
    const result = await fetcher.fetchFavicon('nextdns');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
});
