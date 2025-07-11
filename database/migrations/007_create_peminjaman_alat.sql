-- ==========================================
-- 007_PEMINJAMAN: Equipment borrowing
-- ==========================================

CREATE TABLE IF NOT EXISTS public.peminjaman_alat (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  item_id UUID REFERENCES public.inventaris(id) ON DELETE RESTRICT,
  schedule_id UUID REFERENCES public.jadwal_praktikum(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  borrow_date DATE NOT NULL,
  return_date DATE NOT NULL,
  actual_return_date DATE,
  purpose TEXT NOT NULL,
  mata_kuliah_id UUID REFERENCES public.mata_kuliah(id),
  status peminjaman_status DEFAULT 'pending',
  priority INTEGER DEFAULT 1, -- 1=low, 2=medium, 3=high
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  returned_to UUID REFERENCES public.users(id),
  returned_at TIMESTAMP WITH TIME ZONE,
  condition_on_borrow item_condition DEFAULT 'baik',
  condition_on_return item_condition,
  damage_notes TEXT,
  notes TEXT,
  penalty_amount DECIMAL(10,2) DEFAULT 0,
  penalty_reason TEXT,
  reminder_sent_count INTEGER DEFAULT 0,
  last_reminder_sent TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_quantity CHECK (quantity > 0),
  CONSTRAINT valid_dates CHECK (return_date >= borrow_date),
  CONSTRAINT valid_penalty CHECK (penalty_amount >= 0),
  CONSTRAINT valid_priority CHECK (priority >= 1 AND priority <= 3)
);

-- Indexes
CREATE INDEX idx_peminjaman_user_id ON public.peminjaman_alat(user_id);
CREATE INDEX idx_peminjaman_status ON public.peminjaman_alat(status);
CREATE INDEX idx_peminjaman_borrow_date ON public.peminjaman_alat(borrow_date);
CREATE INDEX idx_peminjaman_return_date ON public.peminjaman_alat(return_date);
CREATE INDEX idx_peminjaman_overdue ON public.peminjaman_alat(return_date) 
  WHERE status = 'borrowed' AND return_date < CURRENT_DATE;

-- Triggers
CREATE TRIGGER update_peminjaman_alat_updated_at 
  BEFORE UPDATE ON public.peminjaman_alat 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();