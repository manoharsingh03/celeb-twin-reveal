
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Palette, Bell, Shield, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
    shareWatermark: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  return (
    <div className="min-h-screen peach-purple-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/80">Customize your CelebTwin experience</p>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-purple-800">Dark Mode</p>
                  <p className="text-sm text-purple-600">Switch to dark theme</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-purple-800">Push Notifications</p>
                  <p className="text-sm text-purple-600">Get notified about new features</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Shield className="w-5 h-5" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-purple-800">Auto-save Results</p>
                  <p className="text-sm text-purple-600">Automatically save your matches</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-purple-800">Share Watermark</p>
                  <p className="text-sm text-purple-600">Add CelebTwin branding to shared images</p>
                </div>
                <Switch
                  checked={settings.shareWatermark}
                  onCheckedChange={(checked) => updateSetting('shareWatermark', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Download className="w-5 h-5" />
                Data Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-600 mb-4">
                Download all your match data and uploaded images
              </p>
              <Button className="bg-gradient-to-r from-orange-400 to-purple-600 text-white border-0">
                Export My Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
