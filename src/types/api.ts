/**
 * API Types - AKBID Lab System
 * Security: Type safety for API operations
 * Status: Complete
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    total_pages?: number;
  };
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  [key: string]: any;
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUploadResponse {
  file_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}
