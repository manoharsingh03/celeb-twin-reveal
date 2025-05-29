
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "Come back soon to find more celebrity matches!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-black" />
        </div>
        <span className="text-white text-sm font-medium">
          {user.email?.split('@')[0]}
        </span>
      </div>
      <Button
        onClick={handleSignOut}
        size="sm"
        variant="ghost"
        className="text-white/80 hover:text-white hover:bg-white/10 p-2"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default UserProfile;
