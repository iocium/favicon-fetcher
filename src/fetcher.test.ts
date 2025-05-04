import { FaviconFetcher } from './fetcher';

describe('FaviconFetcher (mocked)', () => {
  it('successfully fetches mocked favicon', async () => {
    const fetcher = new FaviconFetcher('github.com');
    const result = await fetcher.fetchFavicon('iconHorse');

    expect(result.status).toBe(200);
    expect(result.contentType).toBe('image/png');
    expect(result.content.byteLength).toBeGreaterThan(0);
  });
});
