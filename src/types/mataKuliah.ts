/**
 * Mata Kuliah Types - AKBID Lab System
 * Security: Type safety for course operations
 * Status: Complete
 */

export interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  deskripsi?: string;
  tujuan_pembelajaran?: string;
  dosen_pengampu: string[];
  lab_requirements: string[];
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface MataKuliahSchedule {
  id: string;
  mata_kuliah_id: string;
  dosen_id: string;
  lab_id: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
  start_time: string;
  end_time: string;
  semester: 'ganjil' | 'genap';
  academic_year: string;
  max_students: number;
  enrolled_students: number;
  status: 'active' | 'inactive';
}

export interface StudentEnrollment {
  id: string;
  mata_kuliah_id: string;
  student_id: string;
  semester: string;
  academic_year: string;
  status: 'enrolled' | 'completed' | 'dropped';
  final_grade?: string;
  enrolled_at: string;
}

export interface LearningMaterial {
  id: string;
  mata_kuliah_id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'assignment';
  content?: string;
  file_url?: string;
  external_url?: string;
  is_required: boolean;
  order_index: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}
