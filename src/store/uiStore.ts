/**
 * UI Store - AKBID Lab System
 * UI state management for global interface controls
 * Status: Complete
 */
import { create } from 'zustand';

export interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Loading states
  globalLoading: boolean;
  pageLoading: boolean;
  
  // Modals
  activeModal: string | null;
  modalData: any;
  
  // Notifications
  notifications: Notification[];
  
  // Mobile
  isMobile: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setGlobalLoading: (loading: boolean) => void;
  setPageLoading: (loading: boolean) => void;
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setIsMobile: (isMobile: boolean) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  sidebarOpen: true,
  sidebarCollapsed: false,
  theme: 'system',
  globalLoading: false,
  pageLoading: false,
  activeModal: null,
  modalData: null,
  notifications: [],
  isMobile: window.innerWidth < 768,

  // Actions
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  setTheme: (theme: 'light' | 'dark' | 'system') => {
    set({ theme });
    
    // Apply theme to document
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  },

  setGlobalLoading: (globalLoading: boolean) => {
    set({ globalLoading });
  },

  setPageLoading: (pageLoading: boolean) => {
    set({ pageLoading });
  },

  openModal: (modalId: string, data?: any) => {
    set({ activeModal: modalId, modalData: data });
  },

  closeModal: () => {
    set({ activeModal: null, modalData: null });
  },

  addNotification: (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, notification.duration || 5000);
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  setIsMobile: (isMobile: boolean) => {
    set({ isMobile });
  },
}));