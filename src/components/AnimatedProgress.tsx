
import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

const AnimatedProgress = ({ value, label, showPercentage = true }: AnimatedProgressProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full max-w-md mx-auto">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white/90">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-yellow-300">{displayValue}%</span>
          )}
        </div>
      )}
      
      <div className="relative">
        {/* Background */}
        <div className="w-full h-6 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
            style={{ width: `${displayValue}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Glow effect */}
        <div 
          className="absolute top-0 h-6 bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-red-400/50 rounded-full blur-sm transition-all duration-2000 ease-out"
          style={{ width: `${displayValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedProgress;
