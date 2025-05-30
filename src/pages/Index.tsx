
import { useState } from "react";
import PhotoUpload from "../components/PhotoUpload";
import FaceMatchingEngine from "../components/FaceMatchingEngine";
import EnhancedCelebrityMatch from "../components/EnhancedCelebrityMatch";
import Navigation from "../components/Navigation";
import RegionFilter from "../components/RegionFilter";
import { Button } from "@/components/ui/button";
import { Brain, Camera, Share2, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [matchResult, setMatchResult] = useState<{ celebrity: any; matchScore: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const { user, loading } = useAuth();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowRegionFilter(true);
    setShowAnalysis(false);
    setMatchResult(null);
    setError(null);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setShowRegionFilter(false);
    setShowAnalysis(true);
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
    setShowRegionFilter(false);
    setShowAnalysis(false);
    setMatchResult(null);
    setError(null);
    setSelectedRegion("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen purple-gradient flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-cyan-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen purple-gradient relative">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Main Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="text-cyan-300 w-8 h-8" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              CelebTwin AI
            </h1>
            <Brain className="text-cyan-300 w-8 h-8" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-2">
            Discover your celebrity doppelganger using advanced AI face recognition!
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
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
              <PhotoUpload onImageUpload={handleImageUpload} />
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 border border-white/20">
                  <Camera className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">AI Face Analysis</h3>
                  <p className="text-white/80 text-sm">Advanced facial recognition technology analyzes your features instantly</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 border border-white/20">
                  <Brain className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Smart Matching</h3>
                  <p className="text-white/80 text-sm">Our AI compares your face with hundreds of celebrity features</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 border border-white/20">
                  <Share2 className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Share Results</h3>
                  <p className="text-white/80 text-sm">Download and share your results with friends on social media</p>
                </div>
              </div>
            </div>
          )}

          {uploadedImage && showRegionFilter && (
            <div className="text-center space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                <img 
                  src={uploadedImage} 
                  alt="Your uploaded photo" 
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-cyan-300 shadow-lg mb-4"
                />
                <h3 className="text-white font-semibold text-lg mb-2">Great photo! Now choose your celebrity region:</h3>
              </div>
              
              <RegionFilter 
                onRegionSelect={handleRegionSelect}
                selectedRegion={selectedRegion}
              />
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
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <div className="text-white mb-4">
                <Zap className="w-12 h-12 mx-auto mb-2 text-red-300" />
                <h3 className="text-xl font-bold mb-2">Oops!</h3>
                <p>{error}</p>
              </div>
              <Button 
                onClick={resetApp}
                className="bg-cyan-400 hover:bg-cyan-500 text-white border-0 rounded-full px-8"
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
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 border backdrop-blur-sm hover:scale-105 transition-all duration-300 rounded-full px-8"
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
