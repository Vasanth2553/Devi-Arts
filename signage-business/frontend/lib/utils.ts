/**
 * Utility functions used throughout the frontend.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with deduplication.
 * Use this for all className composition.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a file size in bytes to a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Format dimensions to a readable string.
 */
export function formatDimensions(
  width: number | null,
  height: number | null,
  unit: string
): string {
  if (!width && !height) return "Not specified";
  if (width && height) return `${width} × ${height} ${unit}`;
  if (width) return `${width} ${unit} (width)`;
  return `${height} ${unit} (height)`;
}

/**
 * Convert a string to a URL-friendly slug.
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
}

/**
 * Check if a file extension is allowed.
 */
export function isAllowedFileType(filename: string): boolean {
  const allowed = [".jpg", ".jpeg", ".png", ".pdf", ".svg", ".ai", ".cdr", ".webp"];
  const ext = filename.toLowerCase().substring(filename.lastIndexOf("."));
  return allowed.includes(ext);
}

/**
 * Get a user-friendly error message from an unknown error.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred. Please try again.";
}
