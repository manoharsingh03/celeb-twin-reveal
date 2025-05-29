
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const PhotoUpload = ({ onImageUpload }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
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
    multiple: false
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 bg-white/10 backdrop-blur-sm ${
          isDragActive 
            ? 'border-cyan-300 bg-white/20 scale-105' 
            : 'border-white/30 hover:border-cyan-400 hover:bg-white/15'
        }`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="space-y-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-cyan-300 shadow-2xl"
            />
            <p className="text-white font-medium">Perfect! Click analyze to find your match</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Upload className="w-16 h-16 text-white/70 mx-auto" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                <Camera className="w-3 h-3 text-black" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isDragActive ? "Drop your photo here!" : "Upload your photo"}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Drag & drop or click to select • JPG, PNG, WEBP
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-none hover:scale-105 transition-all duration-300"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-white/60 text-xs">
          Your photo is processed locally and never stored on our servers
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
