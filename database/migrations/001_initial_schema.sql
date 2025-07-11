-- ==========================================
-- 001_INITIAL_SCHEMA: Extensions + Enums
-- ==========================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types/enums
CREATE TYPE user_role AS ENUM ('admin', 'dosen', 'laboran', 'mahasiswa', 'dev_super');
CREATE TYPE lab_status AS ENUM ('active', 'maintenance', 'inactive');
CREATE TYPE item_condition AS ENUM ('baik', 'rusak', 'maintenance', 'hilang');
CREATE TYPE peminjaman_status AS ENUM ('pending', 'approved', 'rejected', 'borrowed', 'returned', 'overdue');
CREATE TYPE presensi_status AS ENUM ('hadir', 'tidak_hadir', 'izin', 'sakit', 'terlambat');
CREATE TYPE laporan_status AS ENUM ('draft', 'submitted', 'reviewed', 'revision', 'approved', 'rejected');
CREATE TYPE semester_type AS ENUM ('ganjil', 'genap');
CREATE TYPE session_type AS ENUM ('teori', 'praktikum', 'ujian');

-- Create update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';