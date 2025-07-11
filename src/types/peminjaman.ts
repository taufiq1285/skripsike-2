/**
 * Peminjaman Types - AKBID Lab System
 * Security: Type safety for borrowing operations
 * Status: Complete
 */

export interface Borrowing {
  id: string;
  user_id: string;
  user_name: string;
  user_role: string;
  item_id: string;
  item_name: string;
  quantity: number;
  borrow_date: string;
  return_date: string;
  actual_return_date?: string;
  purpose: string;
  mata_kuliah_id?: string;
  status: 'pending' | 'approved' | 'rejected' | 'borrowed' | 'returned' | 'overdue';
  approved_by?: string;
  approved_at?: string;
  returned_to?: string;
  returned_at?: string;
  condition_on_return?: 'baik' | 'rusak' | 'hilang';
  notes?: string;
  penalty_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface BorrowingItem {
  id: string;
  borrowing_id: string;
  item_id: string;
  item_name: string;
  quantity: number;
  condition_before: 'baik' | 'rusak' | 'maintenance';
  condition_after?: 'baik' | 'rusak' | 'hilang';
  serial_numbers?: string[];
  notes?: string;
}

export interface BorrowingRule {
  id: string;
  role: string;
  max_items_per_request: number;
  max_days_per_borrow: number;
  max_concurrent_borrowings: number;
  requires_approval: boolean;
  allowed_item_categories: string[];
  created_at: string;
}

export interface BorrowingHistory {
  user_id: string;
  total_borrowings: number;
  total_returned: number;
  total_overdue: number;
  total_penalties: number;
  last_borrowing_date?: string;
  reputation_score: number;
}
