
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import SocialShare from "./SocialShare";
import { useToast } from "@/hooks/use-toast";

interface CelebrityMatchProps {
  userImage: string;
}

// Mock celebrity data - in a real app this would come from your dataset
const celebrities = [
  {
    name: "Chris Hemsworth",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    description: "Thor himself! You've got that godly charm and strong jawline."
  },
  {
    name: "Emma Stone",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    description: "Witty, charming, and absolutely radiant - just like the Oscar winner!"
  },
  {
    name: "Ryan Gosling",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    description: "Cool, mysterious, and effortlessly handsome. Hey girl, you look amazing!"
  },
  {
    name: "Zendaya",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    description: "Stunning, talented, and absolutely iconic - you're a true star!"
  }
];

const CelebrityMatch = ({ userImage }: CelebrityMatchProps) => {
  const [celebrity] = useState(() => celebrities[Math.floor(Math.random() * celebrities.length)]);
  const [matchScore] = useState(() => Math.floor(Math.random() * 20) + 75); // 75-95%
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const downloadResult = async () => {
    // Create a canvas to generate the shareable image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 1000;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2563EB');
    gradient.addColorStop(0.5, '#9333EA');
    gradient.addColorStop(1, '#06B6D4');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text and download
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CelebTwin Match!', canvas.width / 2, 100);
    
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`${matchScore}% Match`, canvas.width / 2, 180);
    ctx.fillText(`with ${celebrity.name}`, canvas.width / 2, 230);
    
    // Download the canvas as image
    const link = document.createElement('a');
    link.download = `celebtwin-${celebrity.name.replace(' ', '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Image Downloaded!",
      description: "Share your celebrity twin match with friends!",
    });
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
          <div className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-2xl mb-4 animate-pulse shadow-2xl">
            {matchScore}% MATCH!
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={downloadResult}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Result
          </Button>
          
          <SocialShare 
            celebrity={celebrity.name}
            matchScore={matchScore}
          />
        </div>

        {/* Fun Fact */}
        <div className="mt-8 text-center bg-white/5 rounded-2xl p-4">
          <p className="text-white/70 text-sm">
            ✨ Fun fact: You both share similar facial structure and features that make you look related!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CelebrityMatch;
