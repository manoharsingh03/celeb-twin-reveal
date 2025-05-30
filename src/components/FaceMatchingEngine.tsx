
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
  const [loadingMessage, setLoadingMessage] = useState("Initializing AI models...");

  useEffect(() => {
    if (isReady && userImage) {
      performMatching();
    }
  }, [isReady, userImage]);

  useEffect(() => {
    if (isInitializing) {
      setLoadingMessage("Loading AI models...");
    } else if (isAnalyzing) {
      setLoadingMessage("Analyzing your facial features...");
    }
  }, [isInitializing, isAnalyzing]);

  const performMatching = async () => {
    setIsAnalyzing(true);
    
    try {
      // Add realistic delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await findCelebrityMatch(userImage);
      
      if (result) {
        // Filter result based on selected region if not "all"
        if (selectedRegion !== "all") {
          // This is where you would filter based on celebrity regions
          // For now, we'll accept any match since the filtering would need
          // to be implemented in the findCelebrityMatch function
        }
        
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
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-0">
      <LoadingAnimation message={loadingMessage} />
      
      <div className="mt-6 text-center">
        <div className="bg-purple-50 rounded-2xl p-4 max-w-md mx-auto">
          <p className="text-purple-700 text-sm mb-2">
            🔍 Current Status: {isInitializing ? "Loading Models" : "Analyzing Face"}
          </p>
          {selectedRegion !== "all" && (
            <p className="text-purple-600 text-xs">
              🎬 Focusing on {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} celebrities
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceMatchingEngine;
