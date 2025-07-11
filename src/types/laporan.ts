/**
 * Laporan Types - AKBID Lab System
 * Security: Type safety for report operations
 * Status: Complete
 */

export interface Report {
  id: string;
  student_id: string;
  student_name: string;
  mata_kuliah_id: string;
  mata_kuliah_name: string;
  schedule_id: string;
  title: string;
  description?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  submission_date: string;
  due_date: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'revision' | 'approved' | 'rejected';
  grade?: number;
  feedback?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  revision_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReportTemplate {
  id: string;
  mata_kuliah_id: string;
  title: string;
  description: string;
  template_url?: string;
  required_sections: string[];
  max_file_size: number;
  allowed_file_types: string[];
  due_days_after_session: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
}

export interface ReportRevision {
  id: string;
  report_id: string;
  version: number;
  file_url: string;
  changes_summary?: string;
  submitted_at: string;
}

export interface ReportGrading {
  id: string;
  report_id: string;
  criteria: string;
  max_score: number;
  score: number;
  comments?: string;
  graded_by: string;
  graded_at: string;
}
