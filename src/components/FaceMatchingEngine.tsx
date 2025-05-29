
import { useState } from 'react';
import { useFaceMatching } from '@/hooks/useFaceMatching';
import { Button } from '@/components/ui/button';
import { AlertCircle, Brain, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FaceMatchingEngineProps {
  userImage: string;
  onMatchFound: (celebrity: any, matchScore: number) => void;
  onError: (error: string) => void;
}

const FaceMatchingEngine = ({ userImage, onMatchFound, onError }: FaceMatchingEngineProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isInitializing, isReady, error, findCelebrityMatch, initializeSystem } = useFaceMatching();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!isReady) {
      onError('Face recognition system not ready. Please wait...');
      return;
    }

    setIsAnalyzing(true);

    try {
      const match = await findCelebrityMatch(userImage);
      
      if (match) {
        onMatchFound(match.celebrity, match.matchScore);
        toast({
          title: "Match Found!",
          description: `You're ${match.matchScore}% similar to ${match.celebrity.name}!`,
        });
      } else {
        onError('No suitable match found. Please try a clearer photo.');
      }
    } catch (err: any) {
      console.error('Matching error:', err);
      onError(err.message || 'Failed to analyze your photo. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-white mb-2">Loading AI Models...</h3>
        <p className="text-white/80">Preparing face recognition system</p>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div className="bg-cyan-400 h-2 rounded-full animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">System Error</h3>
        <p className="text-white/80 mb-4">{error}</p>
        <Button 
          onClick={initializeSystem}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Retry Initialization
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <img 
          src={userImage} 
          alt="Your photo" 
          className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-cyan-300 shadow-2xl mb-4"
        />
        
        {isAnalyzing ? (
          <div>
            <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-2xl font-bold text-white mb-2">Analyzing your features...</h3>
            <p className="text-white/80">Our AI is comparing you with celebrities</p>
          </div>
        ) : (
          <div>
            <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready to find your twin!</h3>
            <p className="text-white/80 mb-4">Click to analyze your facial features</p>
            
            <Button 
              onClick={handleAnalyze}
              disabled={!isReady}
              className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Brain className="w-5 h-5 mr-2" />
              Find My Celebrity Twin
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceMatchingEngine;
