/**
 * Formatter Utilities - AKBID Lab System
 * Security: Safe data formatting functions
 * Status: Ready for use
 */

/**
 * Format Indonesian Rupiah currency
 */
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date to Indonesian locale
 */
export const formatDate = (
  date: string | Date, 
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('id-ID', defaultOptions).format(dateObj);
};

/**
 * Format time to HH:MM format
 */
export const formatTime = (time: string | Date): string => {
  const timeObj = typeof time === 'string' ? new Date(`1970-01-01T${time}`) : time;
  
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(timeObj);
};

/**
 * Format datetime to Indonesian locale
 */
export const formatDateTime = (datetime: string | Date): string => {
  const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime;
  
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Baru saja';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} tahun yang lalu`;
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format phone number to Indonesian format
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.slice(1)}`;
  } else {
    return `+62${cleaned}`;
  }
};

/**
 * Format NIM/NIP with separators
 */
export const formatNimNip = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 4) return cleaned;
  if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}.${cleaned.slice(4)}`;
  if (cleaned.length <= 12) return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 8)}.${cleaned.slice(8)}`;
  
  return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 8)}.${cleaned.slice(8, 12)}.${cleaned.slice(12)}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Format name (capitalize each word)
 */
export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format academic year
 */
export const formatAcademicYear = (year: string): string => {
  const startYear = parseInt(year);
  const endYear = startYear + 1;
  return `${startYear}/${endYear}`;
};

/**
 * Format semester
 */
export const formatSemester = (semester: 'ganjil' | 'genap', year: string): string => {
  const semesterText = semester === 'ganjil' ? 'Ganjil' : 'Genap';
  return `${semesterText} ${formatAcademicYear(year)}`;
};

/**
 * Format status with badge-like styling info
 */
export const formatStatus = (status: string): { text: string; variant: string } => {
  const statusMap: Record<string, { text: string; variant: string }> = {
    // Common statuses
    'active': { text: 'Aktif', variant: 'success' },
    'inactive': { text: 'Tidak Aktif', variant: 'secondary' },
    'pending': { text: 'Menunggu', variant: 'warning' },
    'approved': { text: 'Disetujui', variant: 'success' },
    'rejected': { text: 'Ditolak', variant: 'danger' },
    'completed': { text: 'Selesai', variant: 'success' },
    'cancelled': { text: 'Dibatalkan', variant: 'secondary' },
    
    // Borrowing statuses
    'borrowed': { text: 'Dipinjam', variant: 'info' },
    'returned': { text: 'Dikembalikan', variant: 'success' },
    'overdue': { text: 'Terlambat', variant: 'danger' },
    
    // Attendance statuses
    'hadir': { text: 'Hadir', variant: 'success' },
    'tidak_hadir': { text: 'Tidak Hadir', variant: 'danger' },
    'izin': { text: 'Izin', variant: 'warning' },
    'sakit': { text: 'Sakit', variant: 'info' },
    'terlambat': { text: 'Terlambat', variant: 'warning' },
    
    // Item conditions
    'baik': { text: 'Baik', variant: 'success' },
    'rusak': { text: 'Rusak', variant: 'danger' },
    'maintenance': { text: 'Maintenance', variant: 'warning' },
    'hilang': { text: 'Hilang', variant: 'danger' },
    
    // Report statuses
    'draft': { text: 'Draft', variant: 'secondary' },
    'submitted': { text: 'Dikirim', variant: 'info' },
    'reviewed': { text: 'Diperiksa', variant: 'warning' },
    'revision': { text: 'Revisi', variant: 'warning' },
  };
  
  return statusMap[status] || { text: status, variant: 'secondary' };
};

/**
 * Format grade with letter equivalent
 */
export const formatGrade = (score: number): { numeric: string; letter: string; color: string } => {
  if (score >= 85) return { numeric: score.toString(), letter: 'A', color: 'success' };
  if (score >= 80) return { numeric: score.toString(), letter: 'A-', color: 'success' };
  if (score >= 75) return { numeric: score.toString(), letter: 'B+', color: 'info' };
  if (score >= 70) return { numeric: score.toString(), letter: 'B', color: 'info' };
  if (score >= 65) return { numeric: score.toString(), letter: 'B-', color: 'warning' };
  if (score >= 60) return { numeric: score.toString(), letter: 'C+', color: 'warning' };
  if (score >= 55) return { numeric: score.toString(), letter: 'C', color: 'warning' };
  if (score >= 50) return { numeric: score.toString(), letter: 'C-', color: 'danger' };
  if (score >= 40) return { numeric: score.toString(), letter: 'D', color: 'danger' };
  return { numeric: score.toString(), letter: 'E', color: 'danger' };
};
