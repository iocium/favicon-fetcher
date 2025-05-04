export type Service = 'google' | 'duckduckgo' | 'bitwarden' | 'fastmail' | 'iconHorse' | 'bimi';

export interface FaviconResult {
  url: string;
  contentType: string | null;
  content: ArrayBuffer;
  status: number;
}

export class FaviconFetcher {
  constructor(
    private hostname: string,
    private options?: {
      iconHorseApiKey?: string;
    }
  ) {
    if (!hostname) throw new Error('Hostname is required');
  }

  private static serviceUrls: Record<Service, (hostname: string) => string> = {
    google: (hostname) => `https://www.google.com/s2/favicons?domain=${hostname}`,
    duckduckgo: (hostname) => `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
    bitwarden: (hostname) => `https://icons.bitwarden.net/${hostname}/icon.png`,
    fastmail: (hostname) => `https://proxy.fastmail.com/proxy/icon/${hostname}`,
    iconHorse: (hostname) => `https://icon.horse/icon/${hostname}`,
    bimi: (_) => ''
  };

  public async fetchFavicon(service: Service = 'google'): Promise<FaviconResult> {
    if (service === 'bimi') {
      const bimiDomain = `default._bimi.${this.hostname}`;
      const dnsUrl = `https://cloudflare-dns.com/dns-query?name=${bimiDomain}&type=TXT`;

      const dnsResp = await fetch(dnsUrl, {
        headers: {
          'Accept': 'application/dns-json'
        }
      });

      if (!dnsResp.ok) {
        throw new Error(`BIMI DNS query failed: ${dnsResp.statusText}`);
      }

      const dnsData = await dnsResp.json();
      const txtRecords: string[] = dnsData?.Answer?.map((a: any) => a.data.replace(/^"|"$/g, '')) || [];

      const lRecord = txtRecords.find(txt => txt.includes('l='));
      const logoUrlMatch = lRecord?.match(/l=([^;]+)/);

      if (!logoUrlMatch) {
        throw new Error('No BIMI l= logo URL found in TXT record');
      }

      const logoUrl = logoUrlMatch[1];
      const response = await fetch(logoUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch BIMI logo: ${response.statusText}`);
      }

      const content = await response.arrayBuffer();

      return {
        url: logoUrl,
        contentType: response.headers.get('content-type'),
        content,
        status: response.status
      };
    }

    const urlFn = FaviconFetcher.serviceUrls[service];
    const url = urlFn(this.hostname);

    const headers: HeadersInit = {};
    if (service === 'iconHorse' && this.options?.iconHorseApiKey) {
      headers['X-API-Key'] = this.options.iconHorseApiKey;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch favicon from ${service}: ${response.statusText}`);
    }

    const content = await response.arrayBuffer();

    return {
      url,
      contentType: response.headers.get('content-type'),
      content,
      status: response.status
    };
  }
}
