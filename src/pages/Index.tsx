
import { useState } from "react";
import PhotoUpload from "../components/PhotoUpload";
import FaceMatchingEngine from "../components/FaceMatchingEngine";
import EnhancedCelebrityMatch from "../components/EnhancedCelebrityMatch";
import Navigation from "../components/Navigation";
import RegionFilter from "../components/RegionFilter";
import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Share2, Brain, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [matchResult, setMatchResult] = useState<{ celebrity: any; matchScore: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const { user, loading } = useAuth();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowAnalysis(true);
    setMatchResult(null);
    setError(null);
  };

  const handleMatchFound = (celebrity: any, matchScore: number) => {
    setMatchResult({ celebrity, matchScore });
    setShowAnalysis(false);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setShowAnalysis(false);
    setMatchResult(null);
  };

  const resetApp = () => {
    setUploadedImage(null);
    setShowAnalysis(false);
    setMatchResult(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen peach-purple-gradient flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-orange-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen peach-purple-gradient relative overflow-hidden">
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-400/20 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Main Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="text-yellow-300 w-8 h-8 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-clip-text">
              CelebTwin AI
            </h1>
            <Brain className="text-yellow-300 w-8 h-8 animate-pulse" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover your celebrity doppelganger using advanced AI face recognition! 
            Upload your photo and find out which star you look like most.
          </p>
          {!user && (
            <p className="text-white/70 mt-4">
              Sign in to save your matches and access your history!
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!uploadedImage && (
            <div className="text-center mb-8">
              {/* Region Filter */}
              <RegionFilter 
                onRegionSelect={setSelectedRegion}
                selectedRegion={selectedRegion}
              />
              
              <PhotoUpload onImageUpload={handleImageUpload} />
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/100 transition-all duration-300 hover:scale-105 shadow-lg">
                  <Camera className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-purple-800 font-semibold mb-2">AI Face Analysis</h3>
                  <p className="text-purple-600 text-sm">Advanced facial recognition technology analyzes your features instantly</p>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/100 transition-all duration-300 hover:scale-105 shadow-lg">
                  <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-purple-800 font-semibold mb-2">Smart Matching</h3>
                  <p className="text-purple-600 text-sm">Our AI compares your face with hundreds of celebrity features</p>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/100 transition-all duration-300 hover:scale-105 shadow-lg">
                  <Share2 className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-purple-800 font-semibold mb-2">Share Results</h3>
                  <p className="text-purple-600 text-sm">Download and share your results with friends on social media</p>
                </div>
              </div>
            </div>
          )}

          {uploadedImage && showAnalysis && (
            <FaceMatchingEngine
              userImage={uploadedImage}
              onMatchFound={handleMatchFound}
              onError={handleError}
              selectedRegion={selectedRegion}
            />
          )}

          {error && (
            <div className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
              <div className="text-red-600 mb-4">
                <Zap className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-2 text-purple-800">Oops!</h3>
                <p className="text-purple-600">{error}</p>
              </div>
              <Button 
                onClick={resetApp}
                className="bg-gradient-to-r from-orange-400 to-purple-600 hover:from-orange-500 hover:to-purple-700 text-white border-0"
              >
                Try Another Photo
              </Button>
            </div>
          )}

          {matchResult && uploadedImage && (
            <div className="space-y-6">
              <EnhancedCelebrityMatch 
                userImage={uploadedImage}
                celebrity={{
                  name: matchResult.celebrity.name,
                  image: matchResult.celebrity.imageUrl,
                  description: matchResult.celebrity.description
                }}
                matchScore={matchResult.matchScore}
              />
              <div className="text-center">
                <Button 
                  onClick={resetApp}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 border backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  Try Another Photo
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/60">
          <p>Powered by AI Face Recognition • Made with ❤️ for fun • Share with friends!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
