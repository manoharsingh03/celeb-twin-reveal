
import { useEffect } from "react";

interface ConfettiEffectProps {
  show: boolean;
  duration?: number;
}

const ConfettiEffect = ({ show, duration = 3000 }: ConfettiEffectProps) => {
  if (!show) return null;

  const colors = ['#ff6f61', '#6a0dad', '#ffd700', '#ff1493', '#00bfff', '#32cd32'];
  const shapes = ['🎉', '🎊', '⭐', '💫', '✨', '🌟'];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            fontSize: `${12 + Math.random() * 8}px`,
          }}
        >
          {Math.random() > 0.5 ? (
            <div
              className="w-3 h-3 rounded"
              style={{
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              }}
            />
          ) : (
            shapes[Math.floor(Math.random() * shapes.length)]
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfettiEffect;
