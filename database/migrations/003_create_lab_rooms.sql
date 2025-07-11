-- ==========================================
-- 003_LAB_ROOMS: 9 Labs + 1 Depo
-- ==========================================

CREATE TABLE IF NOT EXISTS public.lab_rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL DEFAULT 0,
  location TEXT,
  floor INTEGER,
  building TEXT,
  facilities TEXT[], -- Array untuk fasilitas
  equipment_count INTEGER DEFAULT 0,
  status lab_status DEFAULT 'active',
  manager_id UUID REFERENCES public.users(id),
  last_maintenance DATE,
  next_maintenance DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_lab_rooms_status ON public.lab_rooms(status);
CREATE INDEX idx_lab_rooms_code ON public.lab_rooms(code);
CREATE INDEX idx_lab_rooms_manager ON public.lab_rooms(manager_id);

-- Triggers
CREATE TRIGGER update_lab_rooms_updated_at 
  BEFORE UPDATE ON public.lab_rooms 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();