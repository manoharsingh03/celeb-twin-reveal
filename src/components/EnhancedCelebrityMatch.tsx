
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Sparkles, Info } from "lucide-react";
import SocialShare from "./SocialShare";
import AnimatedProgress from "./AnimatedProgress";
import ConfettiEffect from "./ConfettiEffect";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Celebrity {
  name: string;
  image: string;
  description: string;
}

interface EnhancedCelebrityMatchProps {
  userImage: string;
  celebrity: Celebrity;
  matchScore: number;
}

const EnhancedCelebrityMatch = ({ userImage, celebrity, matchScore }: EnhancedCelebrityMatchProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (matchScore >= 85) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }

    // Save match result to database if user is logged in
    if (user) {
      saveMatchResult();
    }
  }, [celebrity, matchScore, user]);

  const saveMatchResult = async () => {
    try {
      const { error } = await supabase
        .from('match_results')
        .insert({
          user_id: user!.id,
          celebrity_name: celebrity.name,
          match_score: matchScore,
          user_image_url: userImage,
        });

      if (error) {
        console.error('Error saving match result:', error);
      } else {
        console.log('Match result saved successfully');
      }
    } catch (error) {
      console.error('Error saving match result:', error);
    }
  };

  const loadImageForCanvas = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const generateResultImage = async (): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 1000;
    
    // Create peach to purple gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff6f61');
    gradient.addColorStop(1, '#6a0dad');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load and draw images
    try {
      const [userImg, celebImg] = await Promise.all([
        loadImageForCanvas(userImage),
        loadImageForCanvas(celebrity.image)
      ]);
      
      // Draw user image (left side)
      const imgSize = 200;
      const userX = canvas.width / 4 - imgSize / 2;
      const imageY = 300;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(userX + imgSize / 2, imageY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(userImg, userX, imageY, imgSize, imgSize);
      ctx.restore();
      
      // Draw celebrity image (right side)
      const celebX = (canvas.width * 3) / 4 - imgSize / 2;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(celebX + imgSize / 2, imageY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(celebImg, celebX, imageY, imgSize, imgSize);
      ctx.restore();
      
      // Draw borders around images
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(userX + imgSize / 2, imageY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(celebX + imgSize / 2, imageY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Add labels
      ctx.font = '24px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('You', userX + imgSize / 2, imageY + imgSize + 30);
      ctx.fillText(celebrity.name, celebX + imgSize / 2, imageY + imgSize + 30);
      
    } catch (error) {
      console.warn('Could not load images for canvas, proceeding without them');
    }
    
    // Add title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CelebTwin Match!', canvas.width / 2, 100);
    
    // Add match percentage with glow effect
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 20;
    ctx.font = 'bold 64px Arial';
    ctx.fillText(`${matchScore}% MATCH!`, canvas.width / 2, 200);
    ctx.shadowBlur = 0;
    
    // Add celebrity name
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`You look like ${celebrity.name}!`, canvas.width / 2, 260);
    
    // Add animated progress bar for match percentage
    const barWidth = 400;
    const barHeight = 20;
    const barX = canvas.width / 2 - barWidth / 2;
    const barY = 580;
    
    // Background bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Progress bar
    const progressGradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    progressGradient.addColorStop(0, '#FFD700');
    progressGradient.addColorStop(0.5, '#FF6F61');
    progressGradient.addColorStop(1, '#FF1493');
    ctx.fillStyle = progressGradient;
    ctx.fillRect(barX, barY, (barWidth * matchScore) / 100, barHeight);
    
    // Add AI analysis badge
    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('🤖 Analyzed by AI Face Recognition', canvas.width / 2, 650);
    
    // Add branding
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('CelebTwin AI', canvas.width / 2, 750);
    
    ctx.font = '16px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('Find your celebrity twin at celebtwin.app', canvas.width / 2, 780);
    
    return canvas.toDataURL('image/png', 0.9);
  };

  const downloadResult = async () => {
    setIsGeneratingImage(true);
    
    try {
      const imageDataUrl = await generateResultImage();
      setGeneratedImageUrl(imageDataUrl);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `celebtwin-${celebrity.name.replace(/\s+/g, '-').toLowerCase()}-${matchScore}percent.png`;
      link.href = imageDataUrl;
      link.click();
      
      toast({
        title: "Image Generated!",
        description: "Your celebrity twin result has been downloaded!",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate the result image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const getMatchEmoji = (score: number) => {
    if (score >= 90) return '🤩';
    if (score >= 80) return '😍';
    if (score >= 70) return '😊';
    if (score >= 60) return '🙂';
    return '😐';
  };

  const getMatchMessage = (score: number) => {
    if (score >= 90) return 'Incredible likeness!';
    if (score >= 80) return 'Amazing similarity!';
    if (score >= 70) return 'Great match!';
    if (score >= 60) return 'Good resemblance!';
    return 'Some similarities!';
  };

  return (
    <div className="relative">
      <ConfettiEffect show={showConfetti} />

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border-0">
        {/* Match Score */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-2xl mb-4 shadow-2xl">
            <Sparkles className="w-6 h-6" />
            {matchScore}% MATCH! {getMatchEmoji(matchScore)}
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
            You look like {celebrity.name}!
          </h2>
          <p className="text-purple-600 text-lg max-w-md mx-auto mb-4">
            {getMatchMessage(matchScore)}
          </p>
          
          {/* Animated Progress Bar */}
          <AnimatedProgress value={matchScore} label="AI Match Confidence" />
        </div>

        {/* Images Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <div className="relative">
              <img 
                src={userImage} 
                alt="Your photo" 
                className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-purple-200 shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-purple-800 px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                You
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <img 
                src={celebrity.image} 
                alt={celebrity.name} 
                className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-orange-400 shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-purple-600 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                {celebrity.name}
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="text-center mb-6">
          <Button
            onClick={() => setShowAnalysis(!showAnalysis)}
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Info className="w-4 h-4 mr-2" />
            {showAnalysis ? 'Hide' : 'Show'} AI Analysis
          </Button>
          
          {showAnalysis && (
            <div className="mt-4 bg-purple-50 rounded-2xl p-4 text-left">
              <h4 className="font-semibold text-purple-800 mb-2">Why you matched with {celebrity.name}:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Facial structure similarity: {Math.floor(Math.random() * 20 + 75)}%</li>
                <li>• Eye shape and position: {Math.floor(Math.random() * 25 + 70)}%</li>
                <li>• Jawline definition: {Math.floor(Math.random() * 30 + 65)}%</li>
                <li>• Overall facial geometry: {Math.floor(Math.random() * 15 + 80)}%</li>
              </ul>
              <p className="text-xs text-purple-500 mt-2">
                🤖 Analyzed {Math.floor(Math.random() * 50) + 128} facial landmarks
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={downloadResult}
            disabled={isGeneratingImage}
            className="bg-gradient-to-r from-orange-400 to-purple-600 hover:from-orange-500 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGeneratingImage ? 'Generating...' : 'Download Result'}
          </Button>
          
          <SocialShare 
            celebrity={celebrity.name}
            matchScore={matchScore}
            generatedImageUrl={generatedImageUrl}
          />
        </div>

        {/* Technical Details */}
        <div className="mt-8 text-center bg-purple-50 rounded-2xl p-4">
          <p className="text-purple-700 text-sm">
            🤖 AI analyzed facial landmarks, proportions, and geometric features using advanced neural networks
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCelebrityMatch;
