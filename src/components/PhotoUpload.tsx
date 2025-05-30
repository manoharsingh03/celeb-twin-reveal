
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Camera, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const PhotoUpload = ({ onImageUpload }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  if (preview) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="relative mb-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-cyan-300 shadow-lg"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-white font-semibold text-lg mb-2">Ready to find your twin!</h3>
            <p className="text-white/80 text-sm">Click to analyze your facial features</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 bg-white/10 backdrop-blur-sm ${
          isDragActive 
            ? 'border-cyan-300 bg-white/15 scale-105' 
            : 'border-white/30 hover:border-cyan-400 hover:bg-white/15'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Upload your photo
            </h3>
            <p className="text-white/80 text-base mb-6">
              Drag & drop or click to select • JPG, PNG, WEBP • Max 10MB
            </p>
          </div>

          <div>
            <Button 
              size="lg"
              className="bg-cyan-400 hover:bg-cyan-500 text-white border-0 rounded-full px-8 py-3 text-lg font-semibold"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Choose File
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-500/20 backdrop-blur-sm rounded-xl p-3 border border-red-500/30">
          <div className="flex items-center gap-2 text-red-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm mb-2">
          Your photo is processed locally using AI and never stored on our servers
        </p>
        <p className="text-white/60 text-xs">
          For best results, use a clear front-facing photo with good lighting
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
