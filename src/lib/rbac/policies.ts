/**
 * RLS Policies - AKBID Lab System
 * Security: Row Level Security policy definitions for Supabase
 * Status: Template ready for implementation
 */

// Policy interfaces
export interface Policy {
  table: string;
  name: string;
  action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  expression: string;
  description: string;
}

// Common policy expressions
export const POLICY_EXPRESSIONS = {
  // Admin can do everything
  ADMIN_ALL: "auth.jwt() ->> 'role' = 'admin'",
  
  // User can only access own records
  OWN_RECORDS: "auth.uid() = user_id",
  
  // Dosen can access records related to their courses
  DOSEN_OWN_COURSES: `
    auth.jwt() ->> 'role' = 'dosen' 
    AND EXISTS (
      SELECT 1 FROM mata_kuliah 
      WHERE mata_kuliah.dosen_id = auth.uid() 
      AND mata_kuliah.id = mata_kuliah_id
    )
  `,
  
  // Laboran can access lab-related records
  LABORAN_LAB_ACCESS: "auth.jwt() ->> 'role' = 'laboran'",
  
  // Mahasiswa can only read their own data
  MAHASISWA_READ_OWN: `
    auth.jwt() ->> 'role' = 'mahasiswa' 
    AND auth.uid() = user_id
  `,
  
  // Public read access
  PUBLIC_READ: 'true',
  
  // Authenticated users only
  AUTHENTICATED_ONLY: 'auth.uid() IS NOT NULL',
} as const;

// Policy definitions for each table
export const POLICIES: Policy[] = [
  // Users table policies
  {
    table: 'users',
    name: 'users_admin_all',
    action: 'SELECT',
    expression: POLICY_EXPRESSIONS.ADMIN_ALL,
    description: 'Admin can view all users'
  },
  {
    table: 'users',
    name: 'users_own_profile',
    action: 'SELECT',
    expression: POLICY_EXPRESSIONS.OWN_RECORDS,
    description: 'Users can view their own profile'
  },
  {
    table: 'users',
    name: 'users_update_own',
    action: 'UPDATE',
    expression: POLICY_EXPRESSIONS.OWN_RECORDS,
    description: 'Users can update their own profile'
  },
  
  // Lab rooms policies
  {
    table: 'lab_rooms',
    name: 'lab_rooms_read_all',
    action: 'SELECT',
    expression: POLICY_EXPRESSIONS.AUTHENTICATED_ONLY,
    description: 'All authenticated users can view lab rooms'
  },
  {
    table: 'lab_rooms',
    name: 'lab_rooms_admin_manage',
    action: 'INSERT',
    expression: POLICY_EXPRESSIONS.ADMIN_ALL,
    description: 'Only admin can create lab rooms'
  },
  {
    table: 'lab_rooms',
    name: 'lab_rooms_admin_update',
    action: 'UPDATE',
    expression: POLICY_EXPRESSIONS.ADMIN_ALL,
    description: 'Only admin can update lab rooms'
  },
  
  // Mata kuliah policies
  {
    table: 'mata_kuliah',
    name: 'mata_kuliah_read_all',
    action: 'SELECT',
    expression: POLICY_EXPRESSIONS.AUTHENTICATED_ONLY,
    description: 'All users can view mata kuliah'
  },
  {
    table: 'mata_kuliah',
    name: 'mata_kuliah_admin_manage',
    action: 'INSERT',
    expression: POLICY_EXPRESSIONS.ADMIN_ALL,
    description: 'Only admin can create mata kuliah'
  },
  {
    table: 'mata_kuliah',
    name: 'mata_kuliah_dosen_update',
    action: 'UPDATE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR (auth.jwt() ->> 'role' = 'dosen' AND auth.uid() = dosen_id)`,
    description: 'Admin or assigned dosen can update mata kuliah'
  },

  // Jadwal policies
  {
    table: 'jadwal',
    name: 'jadwal_read_all',
    action: 'SELECT',
    expression: POLICY_EXPRESSIONS.AUTHENTICATED_ONLY,
    description: 'All users can view schedules'
  },
  {
    table: 'jadwal',
    name: 'jadwal_dosen_manage',
    action: 'INSERT',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES}`,
    description: 'Admin or course dosen can create schedules'
  },
  {
    table: 'jadwal',
    name: 'jadwal_dosen_update',
    action: 'UPDATE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES}`,
    description: 'Admin or course dosen can update schedules'
  },

  // Inventaris policies
  {
    table: 'inventaris',
    name: 'inventaris_read_all',
    action: 'SELECT',
    expression: POLICY_EXPRESSIONS.AUTHENTICATED_ONLY,
    description: 'All users can view inventory'
  },
  {
    table: 'inventaris',
    name: 'inventaris_laboran_manage',
    action: 'INSERT',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.LABORAN_LAB_ACCESS}`,
    description: 'Admin or laboran can manage inventory'
  },
  {
    table: 'inventaris',
    name: 'inventaris_laboran_update',
    action: 'UPDATE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.LABORAN_LAB_ACCESS}`,
    description: 'Admin or laboran can update inventory'
  },
  {
    table: 'inventaris',
    name: 'inventaris_laboran_delete',
    action: 'DELETE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.LABORAN_LAB_ACCESS}`,
    description: 'Admin or laboran can delete inventory'
  },

  // Peminjaman policies
  {
    table: 'peminjaman',
    name: 'peminjaman_read_own',
    action: 'SELECT',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.LABORAN_LAB_ACCESS} OR auth.uid() = peminjam_id`,
    description: 'Admin, laboran, or borrower can view borrowing records'
  },
  {
    table: 'peminjaman',
    name: 'peminjaman_create_own',
    action: 'INSERT',
    expression: 'auth.uid() = peminjam_id',
    description: 'Users can create their own borrowing requests'
  },
  {
    table: 'peminjaman',
    name: 'peminjaman_update_own',
    action: 'UPDATE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.LABORAN_LAB_ACCESS} OR (auth.uid() = peminjam_id AND status = 'pending')`,
    description: 'Admin, laboran can update all; users can update own pending requests'
  },

  // Presensi policies
  {
    table: 'presensi',
    name: 'presensi_read_related',
    action: 'SELECT',
    expression: `
      ${POLICY_EXPRESSIONS.ADMIN_ALL} OR 
      ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES} OR 
      (auth.jwt() ->> 'role' = 'mahasiswa' AND auth.uid() = mahasiswa_id)
    `,
    description: 'Admin, course dosen, or own student can view attendance'
  },
  {
    table: 'presensi',
    name: 'presensi_dosen_manage',
    action: 'INSERT',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES}`,
    description: 'Admin or course dosen can create attendance records'
  },
  {
    table: 'presensi',
    name: 'presensi_dosen_update',
    action: 'UPDATE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES}`,
    description: 'Admin or course dosen can update attendance'
  },

  // Laporan policies
  {
    table: 'laporan_mahasiswa',
    name: 'laporan_read_related',
    action: 'SELECT',
    expression: `
      ${POLICY_EXPRESSIONS.ADMIN_ALL} OR 
      ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES} OR 
      (auth.jwt() ->> 'role' = 'mahasiswa' AND auth.uid() = mahasiswa_id)
    `,
    description: 'Admin, course dosen, or report owner can view reports'
  },
  {
    table: 'laporan_mahasiswa',
    name: 'laporan_mahasiswa_create',
    action: 'INSERT',
    expression: `auth.jwt() ->> 'role' = 'mahasiswa' AND auth.uid() = mahasiswa_id`,
    description: 'Students can create their own reports'
  },
  {
    table: 'laporan_mahasiswa',
    name: 'laporan_mahasiswa_update_own',
    action: 'UPDATE',
    expression: `
      ${POLICY_EXPRESSIONS.ADMIN_ALL} OR 
      ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES} OR 
      (auth.jwt() ->> 'role' = 'mahasiswa' AND auth.uid() = mahasiswa_id AND status != 'reviewed')
    `,
    description: 'Admin, dosen can update all; students can update own unreviewed reports'
  },

  // Penilaian policies
  {
    table: 'penilaian',
    name: 'penilaian_read_related',
    action: 'SELECT',
    expression: `
      ${POLICY_EXPRESSIONS.ADMIN_ALL} OR 
      ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES} OR 
      (auth.jwt() ->> 'role' = 'mahasiswa' AND auth.uid() = mahasiswa_id)
    `,
    description: 'Admin, course dosen, or graded student can view grades'
  },
  {
    table: 'penilaian',
    name: 'penilaian_dosen_manage',
    action: 'INSERT',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES}`,
    description: 'Admin or course dosen can create grades'
  },
  {
    table: 'penilaian',
    name: 'penilaian_dosen_update',
    action: 'UPDATE',
    expression: `${POLICY_EXPRESSIONS.ADMIN_ALL} OR ${POLICY_EXPRESSIONS.DOSEN_OWN_COURSES}`,
    description: 'Admin or course dosen can update grades'
  },
];

// Helper functions for policy management
export const getPoliciesByTable = (tableName: string): Policy[] => {
  return POLICIES.filter(policy => policy.table === tableName);
};

export const getPoliciesByAction = (action: Policy['action']): Policy[] => {
  return POLICIES.filter(policy => policy.action === action);
};

export const generatePolicySQL = (policy: Policy): string => {
  return `
CREATE POLICY "${policy.name}" ON "${policy.table}"
FOR ${policy.action}
USING (${policy.expression});
  `.trim();
};

export const generateAllPoliciesSQL = (): string => {
  return POLICIES.map(policy => generatePolicySQL(policy)).join('\n\n');
};

// Enable RLS for all tables
export const enableRLSSQL = (): string => {
  const tables = [...new Set(POLICIES.map(p => p.table))];
  return tables.map(table => `ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`).join('\n');
};

// Disable RLS for development (use with caution!)
export const disableRLSSQL = (): string => {
  const tables = [...new Set(POLICIES.map(p => p.table))];
  return tables.map(table => `ALTER TABLE "${table}" DISABLE ROW LEVEL SECURITY;`).join('\n');
};

// Drop all policies (for reset)
export const dropAllPoliciesSQL = (): string => {
  return POLICIES.map(policy => `DROP POLICY IF EXISTS "${policy.name}" ON "${policy.table}";`).join('\n');
};