
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RegionFilterProps {
  onRegionSelect: (region: string) => void;
  selectedRegion: string;
}

const RegionFilter = ({ onRegionSelect, selectedRegion }: RegionFilterProps) => {
  const regions = [
    { name: "Global Mix", icon: "🌍", value: "all" },
    { name: "Hollywood", icon: "🎬", value: "hollywood" },
    { name: "Bollywood", icon: "🎥", value: "bollywood" },
    { name: "Tollywood", icon: "🎞️", value: "tollywood" },
    { name: "Kollywood", icon: "🎭", value: "kollywood" },
    { name: "K-Pop", icon: "🎼", value: "kpop" },
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 mb-6">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Choose Your Celebrity Region</h3>
          <p className="text-sm text-purple-600">Select which film industry or region to match against</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {regions.map((region) => (
            <Button
              key={region.value}
              onClick={() => onRegionSelect(region.value)}
              variant={selectedRegion === region.value ? "default" : "outline"}
              className={`flex flex-col items-center gap-2 h-auto py-4 ${
                selectedRegion === region.value
                  ? "bg-gradient-to-r from-orange-400 to-purple-600 text-white border-0 shadow-lg"
                  : "bg-white/50 hover:bg-white/80 text-purple-700 border-purple-200"
              } transition-all duration-200 hover:scale-105`}
            >
              <span className="text-2xl">{region.icon}</span>
              <span className="text-sm font-medium">{region.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionFilter;
