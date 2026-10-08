"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, Image as ImageIcon, Trash2, CheckCircle, AlertCircle } from "lucide-react";

interface FileUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  file,
  onFileChange,
  accept = ".jpg,.jpeg,.png,.pdf,.svg,.ai,.cdr",
  maxSizeMB = 10,
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = accept.split(",").map((ext) => ext.trim().toLowerCase());

  const validateFile = (selectedFile: File): boolean => {
    setError(null);
    const fileExt = `.${selectedFile.name.split(".").pop()?.toLowerCase()}`;

    if (!allowedExtensions.includes(fileExt)) {
      setError(`Invalid file format (${fileExt}). Allowed formats: JPG, PNG, PDF, SVG, AI, CDR.`);
      return false;
    }

    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds the ${maxSizeMB}MB limit (Selected: ${fileSizeMB.toFixed(1)}MB).`);
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    if (validateFile(selectedFile)) {
      setProgress(0);
      onFileChange(selectedFile);

      // Simulate quick progress bar
      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        setProgress(p);
        if (p >= 100) clearInterval(interval);
      }, 100);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = file && file.type.startsWith("image/");
  const previewUrl = file && isImage ? URL.createObjectURL(file) : null;

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-[#ED1C24] bg-[#ED1C24]/10 scale-[1.01]"
              : "border-white/10 hover:border-[#ED1C24]/50 bg-[#1a1a1a] hover:bg-[#202020]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />

          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center border border-[#ED1C24]/20">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h4 className="text-base font-bold text-white mb-1">
            Click to upload or drag &amp; drop artwork / logo
          </h4>

          <p className="text-xs text-[#9A9A9A] max-w-sm mx-auto mb-3">
            Supported formats: <strong className="text-gray-300">JPG, PNG, PDF, SVG, AI, CDR</strong> (Max size: {maxSizeMB}MB)
          </p>

          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white shadow-sm hover:bg-white/20 transition-colors">
            Browse Files
          </span>
        </div>
      ) : (
        <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/10 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Uploaded Design Preview"
                className="w-14 h-14 object-cover rounded-xl border border-white/10 bg-black shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 border border-[#00AEEF]/20">
                <FileText className="w-7 h-7" />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white truncate">{file.name}</p>
                <CheckCircle className="w-4 h-4 text-[#8DC63F] shrink-0" />
              </div>
              <p className="text-xs text-[#9A9A9A]">{formatFileSize(file.size)}</p>

              {progress < 100 && (
                <div className="w-48 bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-[#ED1C24] h-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="p-2.5 rounded-xl text-gray-400 hover:text-[#ED1C24] hover:bg-[#ED1C24]/10 transition-colors shrink-0"
            title="Remove File"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs font-semibold text-[#ED1C24] bg-[#ED1C24]/10 p-3 rounded-xl border border-[#ED1C24]/30">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
