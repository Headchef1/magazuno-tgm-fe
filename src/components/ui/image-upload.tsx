import { useState, ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { api } from '@/lib/axios';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  className?: string;
}

export function ImageUpload({ onUpload, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview immediately for better UX
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file); // 'file' must match the @UseInterceptors field name in NestJS

      // Sending file to backend
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Pass the returned URL (e.g., "/uploads/image-123.jpg") to the parent form
      onUpload(response.data.url);
    } catch (error) {
      console.error('Upload failed', error);
      setPreview(null); // Reset preview on error
      alert('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering file input
    setPreview(null);
    onUpload(''); // Clear value in parent form
  };

  return (
    <div
      className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-all duration-300 ${className}`}
    >
      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
        disabled={loading}
      />

      {/* Content State */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover animate-in fade-in duration-500"
          />
        ) : (
          <>
            <Upload className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs font-medium">Tap to upload</span>
          </>
        )}
      </div>

      {/* Remove Button (only if preview exists) */}
      {preview && !loading && (
        <button
          onClick={clearImage}
          className="absolute top-2 right-2 z-20 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
        >
          <X size={16} />
        </button>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
