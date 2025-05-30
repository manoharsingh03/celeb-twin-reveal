
import { useState, useEffect } from "react";
import { useFaceMatching } from "@/hooks/useFaceMatching";
import LoadingAnimation from "./LoadingAnimation";

interface FaceMatchingEngineProps {
  userImage: string;
  onMatchFound: (celebrity: any, matchScore: number) => void;
  onError: (error: string) => void;
  selectedRegion?: string;
}

const FaceMatchingEngine = ({ userImage, onMatchFound, onError, selectedRegion = "all" }: FaceMatchingEngineProps) => {
  const { isInitializing, isReady, error, findCelebrityMatch } = useFaceMatching();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading AI Models...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isReady && userImage) {
      performMatching();
    }
  }, [isReady, userImage]);

  useEffect(() => {
    if (isInitializing) {
      setLoadingMessage("Preparing face recognition system");
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);
      return () => clearInterval(interval);
    } else if (isAnalyzing) {
      setLoadingMessage("Analyzing your facial features");
      setProgress(100);
    }
  }, [isInitializing, isAnalyzing]);

  const performMatching = async () => {
    setIsAnalyzing(true);
    
    try {
      // Add realistic delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await findCelebrityMatch(userImage);
      
      if (result) {
        onMatchFound(result.celebrity, result.matchScore);
      } else {
        onError("No suitable match found. Please try a different photo with a clearer view of your face.");
      }
    } catch (err) {
      console.error('Face matching error:', err);
      onError(err instanceof Error ? err.message : "An error occurred during face analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (error) {
    onError(error);
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="w-full h-full border-4 border-cyan-300 rounded-full animate-spin border-t-transparent"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">{loadingMessage}</h3>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full loading-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-white/80 text-sm mb-6">
          🤖 AI is processing your features...
        </p>
        
        {selectedRegion !== "all" && (
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/70 text-xs">
              🎬 Focusing on {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} celebrities
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceMatchingEngine;
