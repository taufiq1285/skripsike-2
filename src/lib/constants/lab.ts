/**
 * Lab Constants - AKBID Lab System
 * Security: Lab configuration definitions
 * Status: Ready
 */

export const LAB_ROOMS = {
  'lab-ktd': 'Lab Keterampilan Dasar Praktik Kebidanan',
  'lab-anc': 'Lab ANC (Antenatal Care)',
  'lab-pnc': 'Lab PNC (Postnatal Care)',
  'lab-inc': 'Lab INC (Intranatal Care)',
  'lab-bbl': 'Lab BBL (Bayi Baru Lahir)',
  'lab-kb': 'Lab Pelayanan KB',
  'lab-konseling': 'Lab Konseling & Pendidikan Kesehatan',
  'lab-komunitas': 'Lab Kebidanan Komunitas',
  'lab-anak': 'Lab Bayi, Balita, Anak Prasekolah',
  'depo-alat': 'Ruangan Depo Alat'
} as const;

export const LAB_CATEGORIES = {
  PRAKTIKUM: 'praktikum',
  STORAGE: 'storage',
  KONSELING: 'konseling',
  KOMUNITAS: 'komunitas',
} as const;

export const LAB_STATUS = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'inactive',
} as const;

export const EQUIPMENT_CONDITIONS = {
  BAIK: 'baik',
  RUSAK: 'rusak',
  MAINTENANCE: 'maintenance',
  HILANG: 'hilang',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export default LAB_ROOMS;
