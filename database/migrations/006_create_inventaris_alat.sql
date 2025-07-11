-- ==========================================
-- 006_INVENTARIS: Equipment management
-- ==========================================

CREATE TABLE IF NOT EXISTS public.inventaris (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  brand TEXT,
  model TEXT,
  lab_id UUID REFERENCES public.lab_rooms(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  available_quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'pcs',
  condition item_condition DEFAULT 'baik',
  location TEXT,
  specifications JSONB, -- Spesifikasi teknis
  purchase_date DATE,
  purchase_price DECIMAL(12,2),
  supplier TEXT,
  warranty_expires DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  maintenance_schedule TEXT,
  serial_number TEXT,
  barcode TEXT UNIQUE,
  qr_code TEXT,
  image_url TEXT,
  manual_url TEXT,
  notes TEXT,
  created_by UUID REFERENCES public.users(id),
  updated_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_quantity CHECK (quantity >= 0),
  CONSTRAINT valid_available CHECK (available_quantity >= 0 AND available_quantity <= quantity),
  CONSTRAINT valid_price CHECK (purchase_price >= 0)
);

-- Indexes
CREATE INDEX idx_inventaris_lab_id ON public.inventaris(lab_id);
CREATE INDEX idx_inventaris_condition ON public.inventaris(condition);
CREATE INDEX idx_inventaris_category ON public.inventaris(category);
CREATE INDEX idx_inventaris_barcode ON public.inventaris(barcode) WHERE barcode IS NOT NULL;
CREATE INDEX idx_inventaris_available ON public.inventaris(available_quantity) WHERE available_quantity > 0;

-- Triggers
CREATE TRIGGER update_inventaris_updated_at 
  BEFORE UPDATE ON public.inventaris 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();