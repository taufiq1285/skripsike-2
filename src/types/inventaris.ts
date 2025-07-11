/**
 * Inventaris Types - AKBID Lab System
 * Security: Type safety for inventory operations
 * Status: Complete
 */

export interface InventoryItem {
  id: string;
  name: string;
  code: string;
  category: 'phantom' | 'alat_medis' | 'furniture' | 'elektronik' | 'consumable' | 'other';
  brand?: string;
  model?: string;
  lab_id: string;
  quantity: number;
  unit: string;
  condition: 'baik' | 'rusak' | 'maintenance' | 'hilang';
  location: string;
  purchase_date: string;
  purchase_price?: number;
  supplier?: string;
  warranty_expires?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  serial_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
  code: string;
  description?: string;
  parent_id?: string;
  created_at: string;
}

export interface MaintenanceRecord {
  id: string;
  item_id: string;
  type: 'preventive' | 'corrective' | 'calibration';
  description: string;
  performed_by: string;
  performed_at: string;
  cost?: number;
  next_maintenance?: string;
  notes?: string;
}

export interface StockMovement {
  id: string;
  item_id: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  from_location?: string;
  to_location?: string;
  reference_id?: string; // Reference to borrowing, purchase, etc.
  notes?: string;
  created_by: string;
  created_at: string;
}
