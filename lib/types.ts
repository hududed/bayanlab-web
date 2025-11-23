// BayanLab API Types

// Halal Eateries
export interface HalalEatery {
  eatery_id: string;
  name: string;
  cuisine_style: string | null;
  address: {
    street: string | null;
    city: string;
    state: string;
    zip_code: string | null;
  };
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  hours_raw: string | null;
  google_rating: number | null;
  halal_status: 'validated' | 'likely_halal' | 'unverified';
  is_favorite: boolean;
  is_food_truck: boolean;
  is_carry_out_only: boolean;
  is_cafe_bakery: boolean;
  has_many_locations: boolean;
  source: string;
  google_place_id: string | null;
  updated_at: string;
}

export interface HalalEateriesResponse {
  version: string;
  region: string;
  count: number;
  items: HalalEatery[];
}

export interface EateryParams {
  region?: string;
  city?: string;
  cuisine?: string;
  halal_status?: string;
  favorites_only?: boolean;
  limit?: number;
  offset?: number;
}

// Halal Markets
export interface HalalMarket {
  market_id: string;
  name: string;
  category: string | null;
  address: {
    street: string | null;
    city: string;
    state: string;
    zip_code: string | null;
  };
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  hours_raw: string | null;
  google_rating: number | null;
  halal_status: 'validated' | 'likely_halal' | 'unverified';
  has_butcher: boolean;
  has_deli: boolean;
  sells_turkey: boolean;
  source: string;
  google_place_id: string | null;
  updated_at: string;
}

export interface HalalMarketsResponse {
  version: string;
  region: string;
  count: number;
  items: HalalMarket[];
}

// Public Business (different structure from sync endpoint)
export interface PublicBusiness {
  business_id: string;
  name: string;
  category: string | null;
  address: {
    street: string | null;
    city: string;
    state: string;
    zip_code: string | null;
  };
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  description: string | null;
  muslim_owned: boolean;
  updated_at: string;
}

export interface PublicBusinessesResponse {
  version: string;
  region: string;
  count: number;
  items: PublicBusiness[];
}

// Muslim-Owned Businesses
export interface Business {
  business_id: string;
  business_name: string;
  business_industry: string | null;
  business_industry_other: string | null;
  business_description: string | null;
  business_website: string | null;
  business_address: string | null;
  business_city: string;
  business_state: string;
  business_zip: string | null;
  business_phone: string | null;
  business_whatsapp: string | null;
  latitude: number | null;
  longitude: number | null;
  owner_name: string;
  owner_email: string;
  owner_phone: string | null;
  muslim_owned: boolean;
  google_place_id: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  business_hours: Record<string, string> | null;
  photos: string[];
  status: string;
  updated_at: string;
}

export interface BusinessSyncResponse {
  businesses: Business[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface BusinessParams {
  limit?: number;
  offset?: number;
}

// Community Events
export interface Event {
  event_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  venue: {
    name: string;
    address: string | null;
    city: string;
    state: string;
  };
  organizer: {
    name: string;
    email: string | null;
  };
  categories: string[];
  region: string;
  updated_at: string;
}

export interface EventsResponse {
  events: Event[];
  count: number;
}
