/**
 * UI Store - AKBID Lab System
 * Security: UI state management
 * Status: Complete
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Modal state
  activeModal: string | null;
  modalData: unknown;
  
  // Loading states
  globalLoading: boolean;
  loadingStates: Record<string, boolean>;
  
  // Notifications
  notifications: Notification[];
  
  // Actions
  toggleSidebar: () => void;
  collapseSidebar: (collapsed: boolean) => void;
  openModal: (modalName: string, data?: unknown) => void;
  closeModal: () => void;
  setGlobalLoading: (loading: boolean) => void;
  setLoading: (key: string, loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    // Initial state
    sidebarOpen: true,
    sidebarCollapsed: false,
    activeModal: null,
    modalData: null,
    globalLoading: false,
    loadingStates: {},
    notifications: [],

    // Actions
    toggleSidebar: () => {
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      });
    },

    collapseSidebar: (collapsed) => {
      set((state) => {
        state.sidebarCollapsed = collapsed;
      });
    },

    openModal: (modalName, data = null) => {
      set((state) => {
        state.activeModal = modalName;
        state.modalData = data;
      });
    },

    closeModal: () => {
      set((state) => {
        state.activeModal = null;
        state.modalData = null;
      });
    },

    setGlobalLoading: (loading) => {
      set((state) => {
        state.globalLoading = loading;
      });
    },

    setLoading: (key, loading) => {
      set((state) => {
        state.loadingStates[key] = loading;
      });
    },

    addNotification: (notification) => {
      const id = Date.now().toString();
      set((state) => {
        state.notifications.push({
          ...notification,
          id,
        });
      });
    },

    removeNotification: (id) => {
      set((state) => {
        state.notifications = state.notifications.filter((n: { id: string; }) => n.id !== id);
      });
    },

    clearNotifications: () => {
      set((state) => {
        state.notifications = [];
      });
    },
  }))
);

export type { UIState, Notification };