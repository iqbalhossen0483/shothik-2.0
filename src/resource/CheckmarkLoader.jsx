"use client";
import { useEffect, useState } from "react";

export default function CheckmarkLoader({ size = 60 }) {
  const [checkmarkVisible, setCheckmarkVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckmarkVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const circleSize = size;
  const svgSize = Math.round(size * 0.6);
  const strokeWidth = Math.max(2, Math.round(size * 0.05));
  
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        borderRadius: "50%",
        backgroundColor: "#4caf50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(76, 175, 80, 0.5)",
        animation: "scaleIn 0.5s ease-out forwards"
      }}>
        {checkmarkVisible && (
          <svg 
            width={svgSize} 
            height={svgSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: "fadeIn 0.3s ease forwards"
            }}
          >
            <path 
              d="M4 12L9 17L20 6" 
              style={{
                strokeDasharray: "30",
                strokeDashoffset: "30",
                animation: "drawCheck 0.8s ease forwards"
              }}
            />
          </svg>
        )}
      </div>

      <style jsx global>{`
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes drawCheck {
          0% { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}