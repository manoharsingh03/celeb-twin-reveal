
import { useState } from "react";
import PhotoUpload from "../components/PhotoUpload";
import CelebrityMatch from "../components/CelebrityMatch";
import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Share2 } from "lucide-react";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showMatch, setShowMatch] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    // Simulate processing time
    setTimeout(() => {
      setShowMatch(true);
    }, 2000);
  };

  const resetApp = () => {
    setUploadedImage(null);
    setShowMatch(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-300 w-8 h-8" />
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-yellow-200">
              CelebTwin
            </h1>
            <Sparkles className="text-yellow-300 w-8 h-8" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover your celebrity doppelganger! Upload your photo and find out which star you look like most.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!uploadedImage && (
            <div className="text-center mb-8">
              <PhotoUpload onImageUpload={handleImageUpload} />
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Camera className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Upload & Match</h3>
                  <p className="text-white/80 text-sm">Upload your photo and our AI will find your celebrity twin instantly</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Sparkles className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Get Your Score</h3>
                  <p className="text-white/80 text-sm">See your match percentage and discover your celebrity connection</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Share2 className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Share Results</h3>
                  <p className="text-white/80 text-sm">Download and share your results with friends on social media</p>
                </div>
              </div>
            </div>
          )}

          {uploadedImage && !showMatch && (
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
                <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Finding your celebrity twin...</h3>
                <p className="text-white/80">Our AI is analyzing your features</p>
              </div>
            </div>
          )}

          {showMatch && uploadedImage && (
            <div className="space-y-6">
              <CelebrityMatch userImage={uploadedImage} />
              <div className="text-center">
                <Button 
                  onClick={resetApp}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 border backdrop-blur-sm"
                >
                  Try Another Photo
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/60">
          <p>Made with ❤️ for fun • Share with friends!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
