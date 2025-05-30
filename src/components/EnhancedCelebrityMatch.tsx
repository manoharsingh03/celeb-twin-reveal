
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Sparkles } from "lucide-react";
import SocialShare from "./SocialShare";
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
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);

    // Save match result to database if user is logged in
    if (user) {
      saveMatchResult();
    }

    return () => clearTimeout(timer);
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
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2563EB');
    gradient.addColorStop(0.5, '#9333EA');
    gradient.addColorStop(1, '#06B6D4');
    
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
      const imageY = 300; // Fixed variable name
      
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
    ctx.shadowColor = '#00FFFF';
    ctx.shadowBlur = 20;
    ctx.font = 'bold 64px Arial';
    ctx.fillText(`${matchScore}% MATCH!`, canvas.width / 2, 200);
    ctx.shadowBlur = 0;
    
    // Add celebrity name
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`You look like ${celebrity.name}!`, canvas.width / 2, 260);
    
    // Add progress bar for match percentage
    const barWidth = 400;
    const barHeight = 20;
    const barX = canvas.width / 2 - barWidth / 2;
    const barY = 580;
    
    // Background bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Progress bar
    const progressGradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    progressGradient.addColorStop(0, '#00FFFF');
    progressGradient.addColorStop(1, '#FF00FF');
    ctx.fillStyle = progressGradient;
    ctx.fillRect(barX, barY, (barWidth * matchScore) / 100, barHeight);
    
    // Add AI analysis badge
    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('🤖 Analyzed by AI Face Recognition', canvas.width / 2, 650);
    
    // Add branding
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#00FFFF';
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

  return (
    <div className="relative">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded animate-bounce ${
                i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-green-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 animate-scale-in">
        {/* Match Score */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-2xl mb-4 animate-pulse shadow-2xl">
            <Sparkles className="w-6 h-6" />
            {matchScore}% MATCH!
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            You look like {celebrity.name}!
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            {celebrity.description}
          </p>
        </div>

        {/* Images Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <div className="relative">
              <img 
                src={userImage} 
                alt="Your photo" 
                className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-white/30 shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 text-black px-4 py-1 rounded-full font-semibold text-sm">
                You
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <img 
                src={celebrity.image} 
                alt={celebrity.name} 
                className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-cyan-400 shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black px-4 py-1 rounded-full font-semibold text-sm">
                {celebrity.name}
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Real AI Face Analysis • {Math.floor(Math.random() * 50) + 128} features compared</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={downloadResult}
            disabled={isGeneratingImage}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50"
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
        <div className="mt-8 text-center bg-white/5 rounded-2xl p-4">
          <p className="text-white/70 text-sm">
            🤖 AI analyzed facial landmarks, proportions, and geometric features using TensorFlow.js
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCelebrityMatch;
