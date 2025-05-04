import { FaviconFetcher } from './fetcher';

const liveTest = process.env.LIVE_TEST === 'true';

(liveTest ? describe : describe.skip)('FaviconFetcher (live)', () => {
  it('fetches real favicon from iconHorse', async () => {
    const fetcher = new FaviconFetcher('github.com');
    const result = await fetcher.fetchFavicon('iconHorse');

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/image/);
    expect(result.content.byteLength).toBeGreaterThan(0);
  }, 10000);
});
