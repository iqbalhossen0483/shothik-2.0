"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [checkmarkVisible, setCheckmarkVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckmarkVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      zIndex: 9999
    }}>
      <div style={{
        width: "80px",
        height: "80px",
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
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white"
            strokeWidth="3"
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