-- ==========================================
-- 008_PRESENSI: Attendance management
-- ==========================================

CREATE TABLE IF NOT EXISTS public.presensi (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  schedule_id UUID REFERENCES public.jadwal_praktikum(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status presensi_status NOT NULL,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  late_minutes INTEGER DEFAULT 0,
  early_leave_minutes INTEGER DEFAULT 0,
  location_check_in TEXT, -- GPS coordinates or room verification
  notes TEXT,
  activity_log TEXT[], -- Array aktivitas selama praktikum
  performance_notes TEXT,
  recorded_by UUID REFERENCES public.users(id),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_times CHECK (check_out_time IS NULL OR check_out_time >= check_in_time),
  CONSTRAINT valid_late_minutes CHECK (late_minutes >= 0),
  CONSTRAINT unique_student_schedule UNIQUE (schedule_id, student_id)
);

-- Indexes
CREATE INDEX idx_presensi_schedule_id ON public.presensi(schedule_id);
CREATE INDEX idx_presensi_student_id ON public.presensi(student_id);
CREATE INDEX idx_presensi_status ON public.presensi(status);
CREATE INDEX idx_presensi_recorded_at ON public.presensi(recorded_at);

-- Triggers
CREATE TRIGGER update_presensi_updated_at 
  BEFORE UPDATE ON public.presensi 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();