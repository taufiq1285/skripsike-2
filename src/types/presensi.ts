/**
 * Presensi Types - AKBID Lab System
 * Security: Type safety for attendance operations
 * Status: Complete
 */

export interface Attendance {
  id: string;
  schedule_id: string;
  student_id: string;
  student_name: string;
  status: 'hadir' | 'tidak_hadir' | 'izin' | 'sakit' | 'terlambat';
  check_in_time?: string;
  check_out_time?: string;
  notes?: string;
  recorded_by: string;
  recorded_at: string;
  updated_at: string;
}

export interface AttendanceSession {
  id: string;
  schedule_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  total_students: number;
  present_count: number;
  absent_count: number;
  late_count: number;
  status: 'open' | 'closed' | 'cancelled';
  created_by: string;
  created_at: string;
}

export interface AttendanceRule {
  id: string;
  mata_kuliah_id: string;
  minimum_attendance: number; // percentage
  late_tolerance_minutes: number;
  auto_mark_absent_after: number; // minutes
  allow_early_checkin: boolean;
  allow_late_checkin: boolean;
}

export interface AttendanceSummary {
  student_id: string;
  mata_kuliah_id: string;
  total_sessions: number;
  present_sessions: number;
  absent_sessions: number;
  late_sessions: number;
  attendance_percentage: number;
  meets_minimum: boolean;
}
