# @iocium/favicon-fetcher

[![npm](https://img.shields.io/npm/v/@iocium/favicon-fetcher)](https://www.npmjs.com/package/@iocium/favicon-fetcher)
[![build](https://github.com/iocium/favicon-fetcher/actions/workflows/test.yml/badge.svg)](https://github.com/iocium/favicon-fetcher/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/iocium/favicon-fetcher/branch/main/graph/badge.svg)](https://codecov.io/gh/iocium/favicon-fetcher)
[![npm downloads](https://img.shields.io/npm/dm/@iocium/favicon-fetcher)](https://www.npmjs.com/package/@iocium/favicon-fetcher)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@iocium/favicon-fetcher)](https://bundlephobia.com/package/@iocium/favicon-fetcher)
[![types](https://img.shields.io/npm/types/@iocium/favicon-fetcher)](https://www.npmjs.com/package/@iocium/favicon-fetcher)
[![license](https://img.shields.io/npm/l/@iocium/favicon-fetcher)](https://github.com/iocium/favicon-fetcher/blob/main/LICENSE)

A simple TypeScript utility for fetching favicons and BIMI logos from major providers, compatible with Cloudflare Workers, modern browsers, and Node.js.

## Install

```bash
npm install @iocium/favicon-fetcher
```

## Usage

```ts
import { FaviconFetcher } from '@iocium/favicon-fetcher';

const fetcher = new FaviconFetcher('github.com', {
  iconHorseApiKey: 'your-api-key-here'
});
const result = await fetcher.fetchFavicon('iconHorse');

console.log(result.status, result.contentType);
```

## Providers

- Google
- DuckDuckGo
- Bitwarden
- Yandex
- Fastmail
- icon.horse (Pro support via X-API-Key)
- NextDNS
- BIMI (via DNS TXT record lookup)

## Configuration
### `useCorsProxy`

Use this option to fetch through a CORS proxy when running in a browser:

```ts
new FaviconFetcher('github.com', {
  useCorsProxy: true // uses https://corsproxy.io/?
});

new FaviconFetcher('github.com', {
  useCorsProxy: 'https://my-cors-proxy/'
});
```

### `iconHorseApiKey`

Use this to authenticate with [icon.horse Pro](https://icon.horse/docs).

```ts
new FaviconFetcher('github.com', {
  iconHorseApiKey: 'your-api-key'
});
```

This will override any `X-API-Key` passed manually in `headers`.

### `headers`

Set custom headers for fetch requests. Useful for user-agent tagging or auth with custom endpoints:

```ts
new FaviconFetcher('example.com', {
  headers: {
    'User-Agent': 'MyFaviconBot/1.0'
  }
});
```

Note: `X-API-Key` will be overridden if using `iconHorseApiKey`.

### `dohServerUrl`

Override the DNS-over-HTTPS server used for BIMI lookups (default: Cloudflare):

```ts
new FaviconFetcher('paypal.com', {
  dohServerUrl: 'https://dns.google/dns-query'
});
```

## Testing

```bash
npm test         # Runs mocked tests
npm run test:live  # Runs real network integration tests (LIVE_TEST=true)
```

## License

MIT


## 🆕 Advanced: BIMI with custom DNS-over-HTTPS (DoH) server

By default, BIMI lookups use [Cloudflare's DoH endpoint](https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/), but you can override this if you prefer another provider like Google or NextDNS:

```ts
const fetcher = new FaviconFetcher('paypal.com', {
  dohServerUrl: 'https://dns.google/dns-query' // optional
});

const result = await fetcher.fetchFavicon('bimi');
console.log(result.url); // typically an HTTPS SVG
```

Supported DoH endpoints:
- Cloudflare: `https://cloudflare-dns.com/dns-query` (default)
- Google: `https://dns.google/dns-query`
- NextDNS: `https://dns.nextdns.io/YOUR_PROFILE_ID`

> ⚠️ Ensure the DoH server supports **application/dns-json** responses (RFC 8484 JSON mode). No validation is performed on this URL — garbage in, garbage out.
