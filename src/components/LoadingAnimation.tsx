
const LoadingAnimation = ({ message = "Analyzing your face..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative mb-6">
        {/* Neural network visualization */}
        <div className="flex items-center gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full neural-dot"
            />
          ))}
        </div>
        
        {/* Connecting lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 transform -translate-y-1/2"></div>
      </div>
      
      <div className="text-center">
        <h3 className="text-white font-semibold text-lg mb-2">{message}</h3>
        <p className="text-white/70 text-sm">
          🤖 AI is processing <span className="animate-pulse">●●●</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
