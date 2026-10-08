"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { FileUploader } from "./file-uploader";
import { QuoteSuccess } from "./quote-success";
import { Button } from "@/components/ui/button";
import { submitEnquiry, uploadEnquiryFile } from "@/lib/api/enquiries";
import { ApiClientError } from "@/lib/api/client";
import type { EnquirySubmitPayload } from "@/types/enquiry";

const SERVICES = [
  { id: "neon-sign-boards", title: "Neon Sign Boards", desc: "Vibrant illuminated neon signs for shops, cafés, and businesses." },
  { id: "acp-cladding", title: "ACP Cladding", desc: "Modern exterior Aluminium Composite Panel finishes for buildings." },
  { id: "acrylic-letters", title: "Acrylic Letters", desc: "Premium custom 3D acrylic lettering for branding and offices." },
  { id: "vinyl-stickers", title: "Vinyl Stickers", desc: "Customized vinyl graphics for glass, walls, doors, and vehicles." },
  { id: "front-lit-boards", title: "Front-Lit Boards", desc: "High-visibility illuminated signage using front-facing LEDs." },
  { id: "back-lit-boards", title: "Back-Lit Boards", desc: "Halo-effect illuminated signage with glowing back reflection." },
  { id: "ss-letters", title: "Stainless Steel (SS) Letters", desc: "Durable metallic finish 3D letters for offices and showrooms." },
  { id: "trim-cap-letters", title: "Trim Cap Letters", desc: "Professional illuminated trim-cap channel letters for storefronts." },
];

const SIGN_TYPES = [
  { id: "front-lit", name: "Front Lit", desc: "Bright illumination through letter face." },
  { id: "back-lit", name: "Back Lit (Halo)", desc: "Soft ambient halo glow behind letters." },
  { id: "edge-lit", name: "Edge Lit", desc: "Glowing perimeter outline style." },
  { id: "neon-flex", name: "Neon Flex", desc: "Continuous vibrant tube illumination." },
  { id: "acrylic-3d", name: "Acrylic 3D Letters", desc: "Solid 3D raised letters." },
  { id: "non-lit", name: "Non-Lit", desc: "Unlit clean dimensional signage." },
];

const MATERIALS = [
  { id: "acrylic", name: "Cast Acrylic", desc: "High gloss 3mm-10mm acrylic." },
  { id: "acp", name: "ACP Cladding", desc: "Aluminium Composite Panel." },
  { id: "stainless-steel", name: "Stainless Steel", desc: "Brushed silver or golden PVD." },
  { id: "pvc-sunboard", name: "PVC Sunboard", desc: "Lightweight dense foam board." },
  { id: "flex-banner", name: "Star Flex Banner", desc: "High-density UV flex." },
  { id: "vinyl-film", name: "Vinyl & Frosted Film", desc: "Self-adhesive glass graphic film." },
];

const LIGHTING = [
  { id: "cool-white", name: "Cool White (6500K)", desc: "Pure high luminosity white." },
  { id: "warm-white", name: "Warm White (3000K)", desc: "Cozy warm golden glow." },
  { id: "rgb", name: "RGB Color Changing", desc: "Programmable multi-color." },
  { id: "neon-flex", name: "Neon Glow Flex", desc: "Vibrant neon color choice." },
  { id: "non-lit", name: "No Lighting", desc: "Standard unlit finish." },
];

const BUSINESS_TYPES = [
  "Retail & Storefront",
  "Restaurant & Cafe",
  "Salon & Spa",
  "Jewellery & Luxury",
  "Corporate Office",
  "Clinic & Hospital",
  "Pharmacy",
  "Gym & Fitness",
  "School & Institute",
  "Showroom",
  "Event & Exhibition",
  "Other",
];

export function QuoteStepper() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedSignType, setSelectedSignType] = useState(SIGN_TYPES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedLighting, setSelectedLighting] = useState(LIGHTING[0]);

  // Dimensions & Quantities
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(2);
  const [unit, setUnit] = useState<"ft" | "in" | "cm" | "mm">("ft");
  const [quantity, setQuantity] = useState(1);
  const [installationRequired, setInstallationRequired] = useState(true);
  const [requiredDate, setRequiredDate] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");

  // File Upload
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Customer Contact Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [location, setLocation] = useState("");

  // Errors & Status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Pre-fill parameters from URL query if user arrived from Customizer or Service link
  useEffect(() => {
    const textParam = searchParams.get("text");
    const serviceParam = searchParams.get("service");
    const signTypeParam = searchParams.get("signType");
    const lightingParam = searchParams.get("lighting");
    const widthParam = searchParams.get("width");
    const heightParam = searchParams.get("height");

    if (textParam) {
      setAdditionalMessage(`Custom Sign Text: "${textParam}"`);
    }

    if (serviceParam) {
      const match = SERVICES.find((s) => s.id === serviceParam || s.title.toLowerCase().includes(serviceParam.toLowerCase()));
      if (match) setSelectedService(match);
    }

    if (signTypeParam) {
      const match = SIGN_TYPES.find((st) => st.id === signTypeParam || st.name.toLowerCase().includes(signTypeParam.toLowerCase()));
      if (match) setSelectedSignType(match);
    }

    if (lightingParam) {
      const match = LIGHTING.find((l) => l.id === lightingParam || l.name.toLowerCase().includes(lightingParam.toLowerCase()));
      if (match) setSelectedLighting(match);
    }

    if (widthParam) setWidth(Number(widthParam) || 6);
    if (heightParam) setHeight(Number(heightParam) || 2);
  }, [searchParams]);

  const steps = [
    { num: 1, title: "Service" },
    { num: 2, title: "Sign Type" },
    { num: 3, title: "Material" },
    { num: 4, title: "Lighting" },
    { num: 5, title: "Dimensions" },
    { num: 6, title: "Design Upload" },
    { num: 7, title: "Contact Details" },
    { num: 8, title: "Review & Submit" },
  ];

  const validateStep7 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Customer name is required.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phone.replace(/[^0-9]/g, "").length < 8) {
      newErrors.phone = "Please enter a valid phone number (at least 8 digits).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 7) {
      if (!validateStep7()) return;
    }
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitQuote = async () => {
    if (!validateStep7()) {
      setCurrentStep(7);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const unitMap: Record<string, "FEET" | "INCHES" | "CM" | "MM"> = {
        ft: "FEET",
        in: "INCHES",
        cm: "CM",
        mm: "MM",
      };

      const payload: EnquirySubmitPayload = {
        customer_name: name,
        customer_phone: phone,
        customer_whatsapp: whatsapp || phone,
        customer_email: email,
        customer_business_name: businessName,
        customer_business_type: "OTHER",
        customer_location: location,
        service: selectedService.title,
        sign_type: selectedSignType.name,
        material: selectedMaterial.name,
        lighting: selectedLighting.name,
        width: width,
        height: height,
        unit: unitMap[unit] ?? "FEET",
        quantity: quantity,
        installation_required: installationRequired,
        required_date: requiredDate || null,
        message: additionalMessage,
      };

      const response = await submitEnquiry(payload);

      if (uploadedFile && response.enquiry_id) {
        try {
          await uploadEnquiryFile(response.enquiry_id, uploadedFile);
        } catch (uploadErr) {
          console.warn("File upload failed (non-fatal):", uploadErr);
        }
      }

      setSubmittedRefId(response.reference_id);
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.statusCode === 400) {
          setSubmitError(
            "Some information is invalid. Please go back and check your details."
          );
        } else if (err.statusCode !== undefined && err.statusCode >= 500) {
          setSubmitError(
            "Our server is temporarily unavailable. Please WhatsApp us directly or try again in a few minutes."
          );
        } else {
          setSubmitError(err.message);
        }
      } else {
        const localRefId = `DA-${new Date().getFullYear()}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`;
        setSubmittedRefId(localRefId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedRefId) {
    return (
      <QuoteSuccess
        referenceId={submittedRefId}
        customerName={name || "Valued Client"}
        serviceName={selectedService.title}
        signType={selectedSignType.name}
        material={selectedMaterial.name}
        lighting={selectedLighting.name}
        dimensions={`${width} ${unit} × ${height} ${unit}`}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step Progress Bar Header */}
      <div className="bg-[#161616] p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">
          <span>Step 0{currentStep} of 08</span>
          <span className="text-[#ED1C24]">{steps[currentStep - 1].title}</span>
        </div>

        {/* Stepper Dots & Line */}
        <div className="grid grid-cols-8 gap-2 relative">
          {steps.map((step) => {
            const isDone = step.num < currentStep;
            const isCurrent = step.num === currentStep;

            return (
              <button
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                disabled={step.num > currentStep}
                className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  isCurrent
                    ? "text-[#ED1C24] font-bold"
                    : isDone
                    ? "text-[#8DC63F] font-bold"
                    : "text-gray-500 font-normal"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCurrent
                      ? "bg-[#ED1C24] text-white ring-4 ring-[#ED1C24]/20 scale-110 shadow-lg shadow-[#ED1C24]/30"
                      : isDone
                      ? "bg-[#8DC63F] text-black font-bold"
                      : "bg-[#202020] text-gray-400 border border-white/5"
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : `0${step.num}`}
                </div>
                <span className="text-[10px] hidden md:block text-center truncate w-full">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Form Card */}
      <div className="bg-[#161616] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl min-h-[480px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: What do you need? */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  01. Select Service Category
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  What Printing or Signage Service Do You Need?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const isSelected = selectedService.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-[120px] ${
                        isSelected
                          ? "bg-[#ED1C24] text-white border-[#ED1C24] shadow-lg shadow-[#ED1C24]/25 scale-[1.02]"
                          : "bg-[#1f1f1f] border-white/10 text-gray-200 hover:bg-[#282828]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-lg leading-tight">{s.title}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-white" : "border-gray-500"}`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className={`text-xs ${isSelected ? "text-white/90" : "text-[#9A9A9A]"}`}>
                        {s.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Choose Signage Type */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  02. Signage Format
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Choose Format &amp; Lighting Style
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {SIGN_TYPES.map((st) => {
                  const isSelected = selectedSignType.id === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedSignType(st)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? "bg-[#ED1C24] text-white border-[#ED1C24] shadow-lg shadow-[#ED1C24]/25 scale-[1.02]"
                          : "bg-[#1f1f1f] border-white/10 text-gray-200 hover:bg-[#282828]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">{st.name}</span>
                        {isSelected && <Check className="w-5 h-5 text-white" />}
                      </div>
                      <p className={`text-xs ${isSelected ? "text-white/90" : "text-[#9A9A9A]"}`}>
                        {st.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Choose Material */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  03. Material Selection
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Select Primary Substrate / Material
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {MATERIALS.map((m) => {
                  const isSelected = selectedMaterial.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterial(m)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? "bg-[#ED1C24] text-white border-[#ED1C24] shadow-lg shadow-[#ED1C24]/25 scale-[1.02]"
                          : "bg-[#1f1f1f] border-white/10 text-gray-200 hover:bg-[#282828]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">{m.name}</span>
                        {isSelected && <Check className="w-5 h-5 text-white" />}
                      </div>
                      <p className={`text-xs ${isSelected ? "text-white/90" : "text-[#9A9A9A]"}`}>
                        {m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Choose Lighting */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  04. Illumination
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Choose LED &amp; Lighting Options
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {LIGHTING.map((l) => {
                  const isSelected = selectedLighting.id === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLighting(l)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? "bg-[#ED1C24] text-white border-[#ED1C24] shadow-lg shadow-[#ED1C24]/25 scale-[1.02]"
                          : "bg-[#1f1f1f] border-white/10 text-gray-200 hover:bg-[#282828]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">{l.name}</span>
                        {isSelected && <Check className="w-5 h-5 text-white" />}
                      </div>
                      <p className={`text-xs ${isSelected ? "text-white/90" : "text-[#9A9A9A]"}`}>
                        {l.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Dimensions & Quantity */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  05. Dimensions &amp; Scope
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Approximate Dimensions &amp; Quantity
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#1a1a1a] p-6 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Width</label>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value) || 1)}
                    className="w-full px-4 py-3 text-base font-bold bg-[#121212] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Height</label>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value) || 1)}
                    className="w-full px-4 py-3 text-base font-bold bg-[#121212] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Measurement Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full px-4 py-3 text-base font-bold bg-[#121212] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  >
                    <option value="ft">Feet (ft)</option>
                    <option value="in">Inches (in)</option>
                    <option value="cm">Centimeters (CM)</option>
                    <option value="mm">Millimeters (MM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-11 h-11 rounded-xl bg-[#202020] text-white font-bold text-lg flex items-center justify-center hover:bg-[#303030] border border-white/10"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold px-4 text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-11 h-11 rounded-xl bg-[#202020] text-white font-bold text-lg flex items-center justify-center hover:bg-[#303030] border border-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Installation Service</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setInstallationRequired(true)}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        installationRequired
                          ? "bg-[#ED1C24] text-white border-[#ED1C24]"
                          : "bg-[#1f1f1f] border-white/10 text-gray-300"
                      }`}
                    >
                      Required (On-Site Mounting)
                    </button>

                    <button
                      type="button"
                      onClick={() => setInstallationRequired(false)}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        !installationRequired
                          ? "bg-[#ED1C24] text-white border-[#ED1C24]"
                          : "bg-[#1f1f1f] border-white/10 text-gray-300"
                      }`}
                    >
                      Delivery Only
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Upload Logo / Design */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  06. Design Attachment (Optional)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Upload Logo or Reference File
                </h2>
                <p className="text-sm text-[#9A9A9A]">
                  Have a vector artwork, logo, or storefront photo? Upload it here for an exact quote.
                </p>
              </div>

              <FileUploader file={uploadedFile} onFileChange={setUploadedFile} />

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-gray-300">Custom Notes / Instructions</label>
                <textarea
                  rows={3}
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="Mention custom colors, fonts, mounting details, or deadlines..."
                  className="w-full p-4 text-sm font-medium bg-[#1a1a1a] border border-white/10 rounded-2xl text-white focus:border-[#ED1C24] outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 7: Customer Contact Details */}
          {currentStep === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  07. Contact Information
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Where Should We Send Your Quotation?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Your Name <span className="text-[#ED1C24]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vasanth Kumar"
                    className="w-full p-3.5 text-sm font-bold bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                  {errors.name && <p className="text-xs text-[#ED1C24] mt-1 font-semibold">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                    Phone Number <span className="text-[#ED1C24]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full p-3.5 text-sm font-bold bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                  {errors.phone && <p className="text-xs text-[#ED1C24] mt-1 font-semibold">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Same as phone or enter alternative"
                    className="w-full p-3.5 text-sm font-medium bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@business.com"
                    className="w-full p-3.5 text-sm font-medium bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Devi Textiles"
                    className="w-full p-3.5 text-sm font-medium bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Business Industry / Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full p-3.5 text-sm font-bold bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt} className="bg-[#1a1a1a] text-white">
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Installation Location / City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Main Commercial Hub, City"
                  className="w-full p-3.5 text-sm font-medium bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-[#ED1C24] outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 8: Review & Submit */}
          {currentStep === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#ED1C24] text-xs font-bold uppercase tracking-wider block mb-1">
                  08. Final Review
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Review Your Signage Requirement
                </h2>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Category Service:</span>
                    <span className="font-bold text-base text-white">{selectedService.title}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Sign Type &amp; Style:</span>
                    <span className="font-bold text-base text-white">{selectedSignType.name}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Material Selection:</span>
                    <span className="font-bold text-base text-white">{selectedMaterial.name}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Lighting Spec:</span>
                    <span className="font-bold text-base text-white">{selectedLighting.name}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Dimensions &amp; Quantity:</span>
                    <span className="font-bold text-base text-white">{width} {unit} × {height} {unit} ({quantity} qty)</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Installation:</span>
                    <span className="font-bold text-base text-white">{installationRequired ? "On-site Installation Required" : "Delivery Only"}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block mb-0.5">Contact Name:</span>
                    <span className="font-bold text-base text-white">{name} ({phone})</span>
                  </div>

                  {businessName && (
                    <div>
                      <span className="text-[#9A9A9A] block mb-0.5">Business:</span>
                      <span className="font-bold text-base text-white">{businessName}</span>
                    </div>
                  )}
                </div>

                {uploadedFile && (
                  <div className="pt-3 border-t border-white/10 text-xs">
                    <span className="text-[#9A9A9A] block mb-1">Attached File:</span>
                    <span className="font-semibold text-[#00AEEF]">{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="p-4 rounded-xl bg-[#ED1C24]/10 border border-[#ED1C24]/30 text-[#ED1C24] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Footer Navigation Controls */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1 || isSubmitting}
            className={`border-white/10 text-gray-300 hover:bg-white/5 ${
              currentStep === 1 ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep < 8 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-[#ED1C24] hover:bg-[#c8171e] text-white font-bold px-8 shadow-lg shadow-[#ED1C24]/20"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmitQuote}
              disabled={isSubmitting}
              className="bg-[#ED1C24] hover:bg-[#c8171e] text-white font-black px-10 py-6 text-base shadow-xl shadow-[#ED1C24]/30"
            >
              {isSubmitting ? "Submitting Requirement..." : "Submit Quote Request"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
