/**
 * Enquiry API functions — quote submission and file upload.
 */

import { apiClient } from "./client";
import type {
  EnquirySubmitPayload,
  EnquirySubmitResponse,
} from "@/types/enquiry";
import type { FileUploadResponse } from "@/types/api";

/**
 * Submit a quote request to the Django backend.
 */
export async function submitEnquiry(
  payload: EnquirySubmitPayload
): Promise<EnquirySubmitResponse> {
  return apiClient.post<EnquirySubmitResponse>("/api/enquiries/", payload);
}

/**
 * Upload a file (logo/design) associated with an enquiry.
 *
 * @param enquiryId - The ID returned from submitEnquiry
 * @param file - The file to upload
 * @param onProgress - Optional progress callback (0–100)
 */
export async function uploadEnquiryFile(
  enquiryId: number,
  file: File,
  onProgress?: (percent: number) => void
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("enquiry_id", String(enquiryId));
  formData.append("file", file);

  // Use XMLHttpRequest for upload progress tracking if callback provided
  if (onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      xhr.open("POST", `${apiUrl}/api/enquiries/upload/`);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText) as FileUploadResponse);
          } catch {
            reject(new Error("Invalid response from server."));
          }
        } else {
          try {
            const data = JSON.parse(xhr.responseText);
            reject(new Error(data.message || "Upload failed."));
          } catch {
            reject(new Error("Upload failed."));
          }
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error. Please check your connection."));
      });

      xhr.send(formData);
    });
  }

  // Fallback: standard fetch without progress
  return apiClient.postForm<FileUploadResponse>(
    "/api/enquiries/upload/",
    formData
  );
}
