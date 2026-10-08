/**
 * Generic API response types
 */

export interface ApiError {
  success: false;
  errors: Record<string, string[]>;
  message?: string;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

// File upload response
export interface FileUploadResponse {
  success: boolean;
  file_id: number;
  original_name: string;
  file_size: number;
}

// Allowed file types for uploads
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
] as const;

export const ALLOWED_FILE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
  ".svg",
  ".ai",
  ".cdr",
] as const;

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
