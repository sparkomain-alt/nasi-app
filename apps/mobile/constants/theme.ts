export const colors = {
  green: '#16A34A',
  greenLight: '#22C55E',
  greenDark: '#15803D',
  magenta: '#D81B60',
  magentaLight: '#E91E8C',
  gold: '#C9962E',

  white: '#FAFAF8',
  offWhite: '#F4F5F1',
  border: '#E2E2DE',
  subtle: '#D8DAD2',
  muted: '#8A877F',
  charcoal: '#2B2B28',
  black: '#1A1A18',

  mapBg: '#E6E9E2',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',

  trafficFree: '#16A34A',
  trafficModerate: '#EAB308',
  trafficSlow: '#F97316',
  trafficHeavy: '#DC2626',
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;
