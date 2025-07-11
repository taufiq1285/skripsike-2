-- ==========================================
-- 004_MATA_KULIAH: Course management
-- ==========================================

CREATE TABLE IF NOT EXISTS public.mata_kuliah (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  sks INTEGER NOT NULL DEFAULT 1,
  semester INTEGER NOT NULL,
  prasyarat TEXT[], -- Array kode mata kuliah prasyarat
  deskripsi TEXT,
  tujuan_pembelajaran TEXT,
  kompetensi TEXT,
  silabus_url TEXT,
  coordinator_id UUID REFERENCES public.users(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_sks CHECK (sks >= 1 AND sks <= 6),
  CONSTRAINT valid_semester CHECK (semester >= 1 AND semester <= 8)
);

-- Indexes
CREATE INDEX idx_mata_kuliah_semester ON public.mata_kuliah(semester);
CREATE INDEX idx_mata_kuliah_status ON public.mata_kuliah(status);
CREATE INDEX idx_mata_kuliah_coordinator ON public.mata_kuliah(coordinator_id);

-- Triggers
CREATE TRIGGER update_mata_kuliah_updated_at 
  BEFORE UPDATE ON public.mata_kuliah 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();