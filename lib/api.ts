import {
  HalalEateriesResponse,
  HalalMarketsResponse,
  EateryParams,
  BusinessSyncResponse,
  BusinessParams,
  PublicBusinessesResponse,
  PublicBusinessParams,
  MasajidResponse,
  MasjidParams,
  StatsResponse,
  CoverageResponse,
  PreviewResponse,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.BAYANLAB_API_KEY || '';

// Helper to get auth headers
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {};
  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  }
  return headers;
}

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
  const res = await fetch(url, { headers: getAuthHeaders() });

  if (!res.ok) {
    throw new Error(`Failed to fetch eateries: ${res.status}`);
  }

  return res.json();
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

export async function fetchMarkets(params: EateryParams = {}): Promise<HalalMarketsResponse> {
  const searchParams = new URLSearchParams();

  if (params.region) searchParams.set('region', params.region);
  if (params.city) searchParams.set('city', params.city);
  if (params.halal_status) searchParams.set('halal_status', params.halal_status);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/halal-markets${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url, { headers: getAuthHeaders() });

  if (!res.ok) {
    throw new Error(`Failed to fetch markets: ${res.status}`);
  }

  return res.json();
}

export async function fetchPublicBusinesses(params: PublicBusinessParams = {}): Promise<PublicBusinessesResponse> {
  const searchParams = new URLSearchParams();

  if (params.state) searchParams.set('state', params.state);
  if (params.city) searchParams.set('city', params.city);
  if (params.category) searchParams.set('category', params.category);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/businesses${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url, { headers: getAuthHeaders() });

  if (!res.ok) {
    throw new Error(`Failed to fetch businesses: ${res.status}`);
  }

  return res.json();
}

export async function fetchMasajid(params: MasjidParams = {}): Promise<MasajidResponse> {
  const searchParams = new URLSearchParams();

  if (params.region) searchParams.set('region', params.region);
  if (params.city) searchParams.set('city', params.city);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset) searchParams.set('offset', String(params.offset));

  const url = `${API_BASE}/v1/masajid${searchParams.toString() ? `?${searchParams}` : ''}`;
  const res = await fetch(url, { headers: getAuthHeaders() });

  if (!res.ok) {
    throw new Error(`Failed to fetch masajid: ${res.status}`);
  }

  return res.json();
}

// Public API endpoints (no authentication required)

export async function fetchStats(): Promise<StatsResponse> {
  const url = `${API_BASE}/v1/stats`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // Refresh every hour

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status}`);
  }

  return res.json();
}

export async function fetchCoverage(): Promise<CoverageResponse> {
  const url = `${API_BASE}/v1/coverage`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch coverage: ${res.status}`);
  }

  return res.json();
}

export async function fetchPreview(region: string): Promise<PreviewResponse> {
  const url = `${API_BASE}/v1/preview?region=${encodeURIComponent(region)}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch preview: ${res.status}`);
  }

  return res.json();
}
