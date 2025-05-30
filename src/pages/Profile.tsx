
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen peach-purple-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
            <p>Please sign in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen peach-purple-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Profile</h1>
          <p className="text-white/80">Manage your CelebTwin account</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600">Email</p>
                  <p className="font-medium text-purple-800">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600">Member Since</p>
                  <p className="font-medium text-purple-800">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Trophy className="w-5 h-5" />
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-orange-500">0</p>
                <p className="text-sm text-purple-600">Total Matches</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">0%</p>
                <p className="text-sm text-purple-600">Best Match</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-500">0</p>
                <p className="text-sm text-purple-600">Images Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
