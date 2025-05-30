
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface MatchHistory {
  id: string;
  celebrity_name: string;
  match_score: number;
  user_image_url: string;
  created_at: string;
}

const History = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [matches, setMatches] = useState<MatchHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('match_results')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMatches(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast({
        title: "Error",
        description: "Failed to load match history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMatch = async (id: string) => {
    try {
      const { error } = await supabase
        .from('match_results')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMatches(matches.filter(match => match.id !== id));
      toast({
        title: "Deleted",
        description: "Match removed from history"
      });
    } catch (error) {
      console.error('Error deleting match:', error);
      toast({
        title: "Error",
        description: "Failed to delete match",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen peach-purple-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
            <p>Please sign in to view your match history</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen peach-purple-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Match History</h1>
          <p className="text-white/80">All your celebrity doppelganger discoveries</p>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-white">
            <p className="text-xl mb-4">No matches yet!</p>
            <p>Upload a photo to start finding your celebrity twin</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <Card key={match.id} className="bg-white/95 backdrop-blur-sm shadow-lg border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={match.user_image_url} 
                      alt="Your photo" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {match.match_score}% Match
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-800 mb-2">
                      You look like {match.celebrity_name}!
                    </h3>
                    <p className="text-sm text-purple-600 mb-4">
                      {new Date(match.created_at).toLocaleDateString()}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-400 to-purple-600 text-white border-0">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-200">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => deleteMatch(match.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
