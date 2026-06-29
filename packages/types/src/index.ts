// ─── User ────────────────────────────────────────────────────────────────────
export interface NasiUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  savedPlaces: SavedPlace[];
  preferences: UserPreferences;
  createdAt: number;
  isNasirian: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'nasi';
  voiceGuidance: boolean;
  avoidTolls: boolean;
  avoidHighways: boolean;
  language: string;
}

export interface SavedPlace {
  id: string;
  label: string;
  address: string;
  lat: number;
  lng: number;
  icon: 'home' | 'work' | 'star';
}

// ─── Location ─────────────────────────────────────────────────────────────────
export interface LatLng {
  lat: number;
  lng: number;
}

export interface Place {
  placeId: string;
  name: string;
  address: string;
  location: LatLng;
  types: string[];
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export type TrafficLevel = 'free' | 'moderate' | 'slow' | 'heavy';

export interface RouteSegment {
  points: LatLng[];
  traffic: TrafficLevel;
  distanceM: number;
  durationS: number;
}

export interface Route {
  id: string;
  origin: Place;
  destination: Place;
  segments: RouteSegment[];
  totalDistanceM: number;
  totalDurationS: number;
  isAlternative: boolean;
}

export interface NavigationStep {
  instruction: string;
  distanceM: number;
  durationS: number;
  maneuver: string;
  location: LatLng;
}

// ─── Community Reports ────────────────────────────────────────────────────────
export type ReportType =
  | 'police'
  | 'accident'
  | 'hazard'
  | 'road_closed'
  | 'speed_camera'
  | 'construction'
  | 'traffic_jam';

export interface CommunityReport {
  id: string;
  type: ReportType;
  location: LatLng;
  userId: string;
  upvotes: number;
  downvotes: number;
  createdAt: number;
  expiresAt: number;
  description?: string;
}

// ─── Fleet ────────────────────────────────────────────────────────────────────
export type VehicleStatus = 'idle' | 'on_trip' | 'offline' | 'emergency';

export interface FleetVehicle {
  id: string;
  companyId: string;
  driverId?: string;
  plate: string;
  model: string;
  location: LatLng;
  heading: number;
  speed: number;
  status: VehicleStatus;
  lastSeen: number;
}

export interface Company {
  id: string;
  name: string;
  adminEmail: string;
  plan: 'basic' | 'pro' | 'enterprise';
  seats: number;
  createdAt: number;
}

// ─── NASIRIANS Live ───────────────────────────────────────────────────────────
export interface NasirianPin {
  userId: string;
  displayName: string;
  photoURL?: string;
  location: LatLng;
  heading: number;
  lastSeen: number;
}
