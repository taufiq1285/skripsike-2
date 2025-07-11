/**
 * Peminjaman Store - AKBID Lab System
 * Security: Borrowing management, approval workflows
 * Status: Template ready
 */
import { create } from 'zustand';
import { Borrowing, BorrowingRule, BorrowingHistory } from '../types/peminjaman';

interface PeminjamanState {
  borrowings: Borrowing[];
  selectedBorrowing: Borrowing | null;
  rules: BorrowingRule[];
  history: BorrowingHistory[];
  loading: boolean;
  error: string | null;
  filters: {
    status?: string;
    user_id?: string;
    item_id?: string;
    date_from?: string;
    date_to?: string;
  };
}

interface PeminjamanStore extends PeminjamanState {
  fetchBorrowings: () => Promise<void>;
  fetchBorrowingById: (id: string) => Promise<void>;
  createBorrowing: (borrowingData: any) => Promise<void>;
  updateBorrowing: (id: string, borrowingData: any) => Promise<void>;
  approveBorrowing: (id: string, approved: boolean, notes?: string) => Promise<void>;
  returnBorrowing: (id: string, condition: string, notes?: string) => Promise<void>;
  fetchRules: () => Promise<void>;
  fetchHistory: (userId?: string) => Promise<void>;
  setSelectedBorrowing: (borrowing: Borrowing | null) => void;
  setFilters: (filters: Partial<PeminjamanState['filters']>) => void;
  clearError: () => void;
}

export const usePeminjamanStore = create<PeminjamanStore>((set, get) => ({
  borrowings: [],
  selectedBorrowing: null,
  rules: [],
  history: [],
  loading: false,
  error: null,
  filters: {},

  fetchBorrowings: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement borrowing fetching API call
      // SECURITY: Filter by user role and permissions
      console.log('Fetching borrowings...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock borrowing data
      const mockBorrowings: Borrowing[] = [
        {
          id: '1',
          user_id: '1',
          user_name: 'Siti Aisyah',
          user_role: 'mahasiswa',
          item_id: '1',
          item_name: 'Phantom Kebidanan',
          quantity: 1,
          borrow_date: '2024-01-15',
          return_date: '2024-01-22',
          purpose: 'Praktikum persalinan normal',
          mata_kuliah_id: '1',
          status: 'pending',
          notes: 'Diperlukan untuk praktikum minggu depan',
          penalty_amount: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        // Add more mock borrowings...
      ];
      
      set({
        borrowings: mockBorrowings,
        loading: false,
      });
    } catch (error) {
      console.error('Borrowings fetch failed:', error);
      set({
        error: error instanceof Error ? error.message : 'Fetch failed',
        loading: false,
      });
    }
  },

  fetchBorrowingById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching borrowing:', id);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const borrowing = get().borrowings.find(b => b.id === id);
      set({
        selectedBorrowing: borrowing || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Borrowing fetch failed',
        loading: false,
      });
    }
  },

  createBorrowing: async (borrowingData: any) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement borrowing creation
      // SECURITY: Validate borrowing rules and item availability
      console.log('Creating borrowing:', borrowingData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Creation failed',
        loading: false,
      });
      throw error;
    }
  },

  updateBorrowing: async (id: string, borrowingData: any) => {
    set({ loading: true, error: null });
    try {
      console.log('Updating borrowing:', id, borrowingData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Update failed',
        loading: false,
      });
      throw error;
    }
  },

  approveBorrowing: async (id: string, approved: boolean, notes?: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement approval logic
      // SECURITY: Check laboran/admin permissions
      console.log('Approving borrowing:', id, approved, notes);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBorrowings = get().borrowings.map(b => 
        b.id === id 
          ? { ...b, status: approved ? 'approved' as const : 'rejected' as const, approved_at: new Date().toISOString() }
          : b
      );
      
      set({
        borrowings: updatedBorrowings,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Approval failed',
        loading: false,
      });
      throw error;
    }
  },

  returnBorrowing: async (id: string, condition: string, notes?: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Returning borrowing:', id, condition, notes);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBorrowings = get().borrowings.map(b => 
        b.id === id 
          ? { 
              ...b, 
              status: 'returned' as const, 
              actual_return_date: new Date().toISOString(),
              condition_on_return: condition as any,
              returned_at: new Date().toISOString()
            }
          : b
      );
      
      set({
        borrowings: updatedBorrowings,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Return failed',
        loading: false,
      });
      throw error;
    }
  },

  fetchRules: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching borrowing rules...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        rules: [], // TODO: Replace with actual data
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Rules fetch failed',
        loading: false,
      });
    }
  },

  fetchHistory: async (userId?: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching borrowing history for user:', userId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        history: [], // TODO: Replace with actual data
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'History fetch failed',
        loading: false,
      });
    }
  },

  setSelectedBorrowing: (borrowing: Borrowing | null) => {
    set({ selectedBorrowing: borrowing });
  },

  setFilters: (filters: Partial<PeminjamanState['filters']>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  clearError: () => {
    set({ error: null });
  },
}));
