/**
 * Mata Kuliah Store - AKBID Lab System
 * Security: Course management, access controls
 * Status: Template ready
 */
import { create } from 'zustand';
import { MataKuliah, MataKuliahSchedule } from '../types/mataKuliah';

interface MataKuliahState {
  courses: MataKuliah[];
  schedules: MataKuliahSchedule[];
  selectedCourse: MataKuliah | null;
  loading: boolean;
  error: string | null;
  filters: {
    semester?: number;
    dosen_id?: string;
    status?: string;
  };
}

interface MataKuliahStore extends MataKuliahState {
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  createCourse: (courseData: any) => Promise<void>;
  updateCourse: (id: string, courseData: any) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  fetchSchedules: (courseId?: string) => Promise<void>;
  createSchedule: (scheduleData: any) => Promise<void>;
  setSelectedCourse: (course: MataKuliah | null) => void;
  setFilters: (filters: Partial<MataKuliahState['filters']>) => void;
  clearError: () => void;
}

export const useMataKuliahStore = create<MataKuliahStore>((set, get) => ({
  courses: [],
  schedules: [],
  selectedCourse: null,
  loading: false,
  error: null,
  filters: {},

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement course fetching API call
      // SECURITY: Filter by user permissions (dosen can only see their courses)
      console.log('Fetching mata kuliah...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock course data
      const mockCourses: MataKuliah[] = [
        {
          id: '1',
          kode: 'KB101',
          nama: 'Praktikum Kebidanan Dasar',
          sks: 2,
          semester: 1,
          deskripsi: 'Praktikum keterampilan dasar dalam kebidanan',
          tujuan_pembelajaran: 'Mahasiswa mampu melakukan keterampilan dasar kebidanan',
          dosen_pengampu: ['1'],
          lab_requirements: ['1', '2'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        // Add more mock courses...
      ];
      
      set({
        courses: mockCourses,
        loading: false,
      });
    } catch (error) {
      console.error('Courses fetch failed:', error);
      set({
        error: error instanceof Error ? error.message : 'Fetch failed',
        loading: false,
      });
    }
  },

  fetchCourseById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching course:', id);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const course = get().courses.find(c => c.id === id);
      set({
        selectedCourse: course || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Course fetch failed',
        loading: false,
      });
    }
  },

  createCourse: async (courseData: any) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement course creation
      // SECURITY: Check dosen/admin permissions
      console.log('Creating course:', courseData);
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

  updateCourse: async (id: string, courseData: any) => {
    set({ loading: true, error: null });
    try {
      console.log('Updating course:', id, courseData);
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

  deleteCourse: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Check for existing schedules and enrollments
      console.log('Deleting course:', id);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedCourses = get().courses.filter(c => c.id !== id);
      set({
        courses: updatedCourses,
        selectedCourse: get().selectedCourse?.id === id ? null : get().selectedCourse,
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

  fetchSchedules: async (courseId?: string) => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching schedules for course:', courseId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        schedules: [], // TODO: Replace with actual data
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Schedules fetch failed',
        loading: false,
      });
    }
  },

  createSchedule: async (scheduleData: any) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implement schedule creation
      // SECURITY: Validate time conflicts
      console.log('Creating schedule:', scheduleData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Schedule creation failed',
        loading: false,
      });
      throw error;
    }
  },

  setSelectedCourse: (course: MataKuliah | null) => {
    set({ selectedCourse: course });
  },

  setFilters: (filters: Partial<MataKuliahState['filters']>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  clearError: () => {
    set({ error: null });
  },
}));
