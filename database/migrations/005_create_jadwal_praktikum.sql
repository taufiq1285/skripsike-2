-- ==========================================
-- 005_JADWAL_PRAKTIKUM: Schedule management
-- ==========================================

CREATE TABLE IF NOT EXISTS public.jadwal_praktikum (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mata_kuliah_id UUID REFERENCES public.mata_kuliah(id) ON DELETE RESTRICT,
  dosen_id UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  lab_id UUID REFERENCES public.lab_rooms(id) ON DELETE RESTRICT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  semester semester_type NOT NULL,
  academic_year TEXT NOT NULL,
  session_type session_type DEFAULT 'praktikum',
  topic TEXT,
  max_students INTEGER DEFAULT 20,
  enrolled_students INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  preparation_notes TEXT,
  equipment_needed TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_time CHECK (end_time > start_time),
  CONSTRAINT valid_capacity CHECK (enrolled_students <= max_students),
  CONSTRAINT no_overlap EXCLUDE USING gist (
    lab_id WITH =,
    daterange(date, date, '[]') WITH &&,
    timerange(start_time, end_time, '[]') WITH &&
  ) WHERE (status != 'cancelled')
);

-- Indexes
CREATE INDEX idx_jadwal_date ON public.jadwal_praktikum(date);
CREATE INDEX idx_jadwal_dosen_id ON public.jadwal_praktikum(dosen_id);
CREATE INDEX idx_jadwal_lab_id ON public.jadwal_praktikum(lab_id);
CREATE INDEX idx_jadwal_status ON public.jadwal_praktikum(status);
CREATE INDEX idx_jadwal_academic_year ON public.jadwal_praktikum(academic_year);

-- Triggers
CREATE TRIGGER update_jadwal_praktikum_updated_at 
  BEFORE UPDATE ON public.jadwal_praktikum 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();