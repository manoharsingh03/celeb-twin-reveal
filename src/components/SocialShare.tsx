
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  celebrity: string;
  matchScore: number;
}

const SocialShare = ({ celebrity, matchScore }: SocialShareProps) => {
  const { toast } = useToast();

  const shareText = `I'm ${matchScore}% match with ${celebrity}! 🤩 Find your celebrity twin at CelebTwin! ✨`;
  const shareUrl = window.location.origin;

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "WhatsApp",
      icon: Share2,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: "bg-green-600 hover:bg-green-700"
    }
  ];

  const handleShare = (url: string, platform: string) => {
    window.open(url, '_blank', 'width=600,height=400');
    toast({
      title: `Sharing to ${platform}`,
      description: "Thanks for spreading the fun!",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText + ' ' + shareUrl);
    toast({
      title: "Copied to clipboard!",
      description: "Share your result anywhere you want!",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex gap-2">
        {shareOptions.map((option) => (
          <Button
            key={option.name}
            onClick={() => handleShare(option.url, option.name)}
            className={`${option.color} text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg`}
            size="sm"
          >
            <option.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>
      
      <Button
        onClick={copyToClipboard}
        variant="outline"
        className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-4 hover:scale-105 transition-all duration-300"
        size="sm"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShare;
