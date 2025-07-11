-- ==========================================
-- 002_USERS: Enhanced user management
-- ==========================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'mahasiswa',
  nim_nip TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  department TEXT,
  semester INTEGER,
  academic_year TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_semester CHECK (semester >= 1 AND semester <= 8),
  CONSTRAINT valid_nim_nip CHECK (
    (role = 'mahasiswa' AND nim_nip IS NOT NULL) OR
    (role IN ('dosen', 'laboran', 'admin') AND nim_nip IS NOT NULL) OR
    (role = 'dev_super')
  )
);

-- Indexes
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_is_active ON public.users(is_active);
CREATE INDEX idx_users_nim_nip ON public.users(nim_nip) WHERE nim_nip IS NOT NULL;

-- Triggers
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();