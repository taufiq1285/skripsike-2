/**
 * Validation Utilities - AKBID Lab System
 * Security: Input validation, data sanitization
 * Status: Ready for use
 */

/**
 * Validation rule interface
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

/**
 * Validation schema interface
 */
export interface ValidationSchema {
  [key: string]: ValidationRule;
}

/**
 * Validate a single field
 */
export const validateField = (value: any, rule: ValidationRule): string | null => {
  // Required validation
  if (rule.required && (value === undefined || value === null || value === '')) {
    return 'Field ini wajib diisi';
  }

  // Skip other validations if value is empty and not required
  if (!value && !rule.required) {
    return null;
  }

  // String validations
  if (typeof value === 'string') {
    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Minimal ${rule.minLength} karakter`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Maksimal ${rule.maxLength} karakter`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Format tidak valid';
    }
  }

  // Custom validation
  if (rule.custom) {
    const customError = rule.custom(value);
    if (customError) {
      return customError;
    }
  }

  return null;
};

/**
 * Validate an object against a schema
 */
export const validateSchema = (data: Record<string, any>, schema: ValidationSchema): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(schema)) {
    const error = validateField(data[field], rule);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
};

/**
 * Common validation rules
 */
export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !value.includes('@')) {
        return 'Email harus mengandung @';
      }
      return null;
    },
  },
  
  password: {
    minLength: 8,
    custom: (value: string) => {
      if (value && value.length < 8) {
        return 'Password minimal 8 karakter';
      }
      if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password harus mengandung huruf besar, kecil, dan angka';
      }
      return null;
    },
  },
  
  phone: {
    pattern: /^(\+62|62|0)[0-9]{9,13}$/,
    custom: (value: string) => {
      if (value && !value.match(/^(\+62|62|0)[0-9]{9,13}$/)) {
        return 'Format nomor telepon tidak valid';
      }
      return null;
    },
  },
  
  nim: {
    pattern: /^[0-9]{8,12}$/,
    custom: (value: string) => {
      if (value && !value.match(/^[0-9]{8,12}$/)) {
        return 'NIM harus 8-12 digit angka';
      }
      return null;
    },
  },
  
  nip: {
    pattern: /^[0-9]{18}$/,
    custom: (value: string) => {
      if (value && !value.match(/^[0-9]{18}$/)) {
        return 'NIP harus 18 digit angka';
      }
      return null;
    },
  },
  
  required: {
    required: true,
  },
  
  positiveNumber: {
    custom: (value: number) => {
      if (value !== undefined && value <= 0) {
        return 'Nilai harus lebih dari 0';
      }
      return null;
    },
  },
  
  percentage: {
    custom: (value: number) => {
      if (value !== undefined && (value < 0 || value > 100)) {
        return 'Persentase harus antara 0-100';
      }
      return null;
    },
  },
};

/**
 * Sanitize HTML input
 */
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate file upload
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): string | null => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
    allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'],
  } = options;

  // Check file size
  if (file.size > maxSize) {
    return `Ukuran file terlalu besar. Maksimal ${Math.round(maxSize / 1024 / 1024)}MB`;
  }

  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return `Tipe file tidak diizinkan. Hanya ${allowedTypes.join(', ')}`;
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (allowedExtensions.length > 0 && extension && !allowedExtensions.includes(extension)) {
    return `Ekstensi file tidak diizinkan. Hanya ${allowedExtensions.join(', ')}`;
  }

  return null;
};

/**
 * Validate date range
 */
export const validateDateRange = (startDate: string, endDate: string): string | null => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    return 'Tanggal mulai harus lebih awal dari tanggal selesai';
  }

  return null;
};

/**
 * Validate time range
 */
export const validateTimeRange = (startTime: string, endTime: string): string | null => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (startMinutes >= endMinutes) {
    return 'Waktu mulai harus lebih awal dari waktu selesai';
  }

  return null;
};
