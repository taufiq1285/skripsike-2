/**
 * Inventaris Store - AKBID Lab System
 * Security: Inventory management, access controls
 * Status: Template ready
 */
import { create } from 'zustand';
import { InventoryItem, MaintenanceRecord, StockMovement } from '../types/inventaris';

interface InventarisState {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  maintenanceRecords: MaintenanceRecord[];
  stockMovements: StockMovement[];
  loading: boolean;
  error: string | null;
  filters: {
    category?: string;
    condition?: string;
    lab_id?: string;
    search?: string;
  };
}

interface InventarisStore extends InventarisState {
  fetchItems: () => Promise<void>;
  fetchItemById: (id: string) => Promise<void>;
  createItem: (itemData: any) => Promise<void>;
  updateItem: (id: string, itemData: any) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  fetchMaintenanceRecords: (itemId?: string) => Promise<void>;
  addMaintenanceRecord: (recordData: any) => Promise<void>;
  fetchStockMovements: (itemId?: string) => Promise<void>;
  addStockMovement: (movementData: any) => Promise<void>;
  setSelectedItem: (item: InventoryItem | null) => void;
  setFilters: (filters: Partial<InventarisState['filters']>) => void;
  clearError: () => void;
}

export const useInventarisStore = create<InventarisStore>((set, get) => ({
  items: [],
  selectedItem: null,
  maintenanceRecords: [],
  stockMovements: [],
  loading: false,
  error: null,
  filters: {},

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement inventory fetching API call
      // SECURITY: Filter by lab access permissions
      console.log('Fetching inventory items...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock inventory data
      const mockItems: InventoryItem[] = [
        {
          id: '1',
          name: 'Phantom Kebidanan',
          code: 'PH-KB-001',
          category: 'phantom',
          brand: 'Laerdal',
          model: 'MamaNatalie',
          lab_id: '1',
          quantity: 5,
          unit: 'unit',
          condition: 'baik',
          location: 'Lab Kebidanan 1',
          purchase_date: '2023-01-15',
          purchase_price: 15000000,
          supplier: 'PT Medical Equipment',
          warranty_expires: '2025-01-15',
          serial_number: 'LRD-2023-001',
          notes: 'Phantom untuk pelatihan persalinan normal',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        // Add more mock items...
      ];
      
      set({
        items: mockItems,
        loading: false,
      });
    } catch (error) {
      console.error('Inventory fetch failed:', error);
      set({
        error: error instanceof Error ? error.message : 'Fetch failed',
        loading: false,
      });
    }
  },

  fetchItemById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching inventory item:', id);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const item = get().items.find(i => i.id === id);
      set({
        selectedItem: item || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Item fetch failed',
        loading: false,
      });
    }
  },

  createItem: async (itemData: any) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement item creation
      // SECURITY: Check laboran/admin permissions
      console.log('Creating inventory item:', itemData);
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

  updateItem: async (id: string, itemData: any) => {
    set({ loading: true, error: null });
    try {
      console.log('Updating inventory item:', id, itemData);
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

  deleteItem: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Check for existing borrowings
      console.log('Deleting inventory item:', id);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedItems = get().items.filter(i => i.id !== id);
      set({
        items: updatedItems,
        selectedItem: get().selectedItem?.id === id ? null : get().selectedItem,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Deletion failed',
        loading: false,
      });
      throw error;
    }
  },

  fetchMaintenanceRecords: async (itemId?: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching maintenance records for item:', itemId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        maintenanceRecords: [], // TODO: Replace with actual data
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Maintenance records fetch failed',
        loading: false,
      });
    }
  },

  addMaintenanceRecord: async (recordData: any) => {
    set({ loading: true, error: null });
    try {
      console.log('Adding maintenance record:', recordData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Maintenance record creation failed',
        loading: false,
      });
      throw error;
    }
  },

  fetchStockMovements: async (itemId?: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching stock movements for item:', itemId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        stockMovements: [], // TODO: Replace with actual data
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Stock movements fetch failed',
        loading: false,
      });
    }
  },

  addStockMovement: async (movementData: any) => {
    set({ loading: true, error: null });
    try {
      console.log('Adding stock movement:', movementData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Stock movement creation failed',
        loading: false,
      });
      throw error;
    }
  },

  setSelectedItem: (item: InventoryItem | null) => {
    set({ selectedItem: item });
  },

  setFilters: (filters: Partial<InventarisState['filters']>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  clearError: () => {
    set({ error: null });
  },
}));
