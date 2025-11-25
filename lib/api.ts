import {
  HalalEateriesResponse,
  HalalMarketsResponse,
  EateryParams,
  BusinessSyncResponse,
  BusinessParams,
  PublicBusinessesResponse,
  MasajidResponse,
  MasjidParams,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchEateries(params: EateryParams = {}): Promise<HalalEateriesResponse> {
  const searchParams = new URLSearchParams();

  if (params.region) searchParams.set('region', params.region);
  if (params.city) searchParams.set('city', params.city);
  if (params.cuisine) searchParams.set('cuisine', params.cuisine);
  if (params.halal_status) searchParams.set('halal_status', params.halal_status);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));
  if (params.favorites_only) searchParams.set('favorites_only', 'true');

  const url = `${API_BASE}/v1/halal-eateries${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch eateries: ${res.status}`);
  }

  return res.json();
}

export async function fetchEateriesCount(): Promise<number> {
  const data = await fetchEateries({ limit: 1 });
  return data.count;
}

export async function fetchBusinesses(params: BusinessParams = {}): Promise<BusinessSyncResponse> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/businesses/sync${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url, {
    headers: {
      'X-API-Key': process.env.BAYANLAB_API_KEY || '',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch businesses: ${res.status}`);
  }

  return res.json();
}

export async function fetchBusinessesCount(): Promise<number> {
  try {
    const data = await fetchBusinesses({ limit: 1 });
    return data.pagination.total;
  } catch {
    // Business endpoint requires auth, return fallback
    return 6;
  }
}

export async function fetchMarkets(params: EateryParams = {}): Promise<HalalMarketsResponse> {
  const searchParams = new URLSearchParams();

  if (params.region) searchParams.set('region', params.region);
  if (params.city) searchParams.set('city', params.city);
  if (params.halal_status) searchParams.set('halal_status', params.halal_status);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/halal-markets${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch markets: ${res.status}`);
  }

  return res.json();
}

export async function fetchPublicBusinesses(params: EateryParams = {}): Promise<PublicBusinessesResponse> {
  const searchParams = new URLSearchParams();

  if (params.region) searchParams.set('region', params.region);
  if (params.city) searchParams.set('city', params.city);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/businesses${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch businesses: ${res.status}`);
  }

  return res.json();
}

export async function fetchMasajid(params: MasjidParams = {}): Promise<MasajidResponse> {
  const searchParams = new URLSearchParams();

  if (params.region) searchParams.set('region', params.region);
  if (params.city) searchParams.set('city', params.city);
  if (params.denomination) searchParams.set('denomination', params.denomination);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/masajid${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch masajid: ${res.status}`);
  }

  return res.json();
}
