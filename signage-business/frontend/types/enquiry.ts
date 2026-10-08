/**
 * Customer and enquiry data types (mirrors backend models)
 */

export type BusinessType =
  | "RETAIL"
  | "RESTAURANT"
  | "CAFE"
  | "SALON"
  | "JEWELLERY"
  | "OFFICE"
  | "CLINIC"
  | "PHARMACY"
  | "GYM"
  | "SCHOOL"
  | "SHOWROOM"
  | "HOTEL"
  | "SUPERMARKET"
  | "OTHER";

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  RETAIL: "Retail Shop",
  RESTAURANT: "Restaurant",
  CAFE: "Cafe",
  SALON: "Salon / Beauty Parlour",
  JEWELLERY: "Jewellery",
  OFFICE: "Office / Corporate",
  CLINIC: "Clinic / Hospital",
  PHARMACY: "Pharmacy",
  GYM: "Gym / Fitness",
  SCHOOL: "School / Education",
  SHOWROOM: "Showroom",
  HOTEL: "Hotel",
  SUPERMARKET: "Supermarket",
  OTHER: "Other",
};

export type DimensionUnit = "FEET" | "INCHES" | "CM" | "MM";

export type EnquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "QUOTED"
  | "APPROVED"
  | "COMPLETED"
  | "CANCELLED";

// The complete data collected across all quote builder steps
export interface QuoteFormData {
  // Step 1: Service selection
  service: string;
  // Step 2: Sign type
  signType: string;
  // Step 3: Material
  material: string;
  // Step 4: Lighting
  lighting: string;
  // Step 5: Dimensions
  width: number | null;
  height: number | null;
  unit: DimensionUnit;
  quantity: number;
  // Step 6: File upload (handled separately via upload endpoint)
  uploadedFileIds: number[];
  uploadedFileNames: string[];
  // Step 7: Customer details
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  customerEmail: string;
  customerBusinessName: string;
  customerBusinessType: BusinessType;
  customerLocation: string;
  // Step 5 extras
  installationRequired: boolean;
  requiredDate: string;
  message: string;
}

// What gets sent to the API (POST /api/enquiries/)
export interface EnquirySubmitPayload {
  customer_name: string;
  customer_phone: string;
  customer_whatsapp: string;
  customer_email: string;
  customer_business_name: string;
  customer_business_type: BusinessType;
  customer_location: string;
  service: string;
  sign_type: string;
  material: string;
  lighting: string;
  width: number | null;
  height: number | null;
  unit: DimensionUnit;
  quantity: number;
  installation_required: boolean;
  required_date: string | null;
  message: string;
}

// Response from POST /api/enquiries/
export interface EnquirySubmitResponse {
  success: boolean;
  reference_id: string;
  enquiry_id: number;
  message: string;
}
