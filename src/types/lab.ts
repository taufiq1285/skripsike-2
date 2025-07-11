/**
 * Lab Types - AKBID Lab System
 * Security: Type safety for lab operations
 * Status: Complete
 */

export interface LabRoom {
  id: string;
  name: string;
  code: string;
  description: string;
  capacity: number;
  location: string;
  equipment_count: number;
  status: 'active' | 'maintenance' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface LabEquipment {
  id: string;
  lab_id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  condition: 'baik' | 'rusak' | 'maintenance';
  purchase_date: string;
  warranty_expires?: string;
  location: string;
  notes?: string;
}

export interface LabBooking {
  id: string;
  lab_id: string;
  user_id: string;
  mata_kuliah_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  purpose: string;
  participants_count: number;
  status: 'pending' | 'approved' | 'ongoing' | 'completed' | 'cancelled';
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LabUsageStats {
  lab_id: string;
  total_bookings: number;
  total_hours: number;
  utilization_rate: number;
  peak_hours: string[];
  most_used_equipment: string[];
}
