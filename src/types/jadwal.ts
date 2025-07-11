/**
 * Jadwal Types - AKBID Lab System
 * Security: Type safety for schedule operations
 * Status: Complete
 */

export interface Schedule {
  id: string;
  mata_kuliah_id: string;
  mata_kuliah_name: string;
  dosen_id: string;
  dosen_name: string;
  lab_id: string;
  lab_name: string;
  date: string;
  start_time: string;
  end_time: string;
  semester: 'ganjil' | 'genap';
  academic_year: string;
  session_type: 'teori' | 'praktikum' | 'ujian';
  max_students: number;
  enrolled_students: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  lab_id?: string;
}

export interface ScheduleConflict {
  type: 'lab_conflict' | 'dosen_conflict' | 'time_conflict';
  message: string;
  conflicting_schedule_id?: string;
}

export interface AcademicCalendar {
  id: string;
  academic_year: string;
  semester: 'ganjil' | 'genap';
  start_date: string;
  end_date: string;
  registration_start: string;
  registration_end: string;
  exam_start: string;
  exam_end: string;
  holidays: Array<{
    date: string;
    name: string;
  }>;
}
