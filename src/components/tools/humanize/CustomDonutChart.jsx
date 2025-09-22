import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CustomDonutChart = ({ data, initialSize = 200 }) => {
  const theme = useTheme();
  const [chartSize, setChartSize] = useState(initialSize);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        setChartSize(initialSize * 0.7);
      } else if (windowWidth < 960) {
        setChartSize(initialSize * 0.85);
      } else {
        setChartSize(initialSize);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialSize]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        width: chartSize,
        height: chartSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "width 0.3s, height 0.3s, transform 0.3s ease",
        cursor: "pointer",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}
    >
      <svg width={chartSize} height={chartSize} viewBox='0 0 100 100'>
        <text
          x='50'
          y='50'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={isHovered ? "16" : "14"}
          fill={theme.palette.text.primary}
          style={{ transition: "font-size 0.3s ease" }}
        >
          {Math.round(data[0].value)}%
        </text>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = (percentage / 100) * CIRCUMFERENCE;
          const rotation = startAngle;
          startAngle += (percentage / 100) * 360;

          return (
            <circle
              key={index}
              cx='50'
              cy='50'
              r={RADIUS}
              fill='none'
              stroke={index === 0 ? "#00AB55" : "#E8F5E9"}
              strokeWidth={isHovered ? "17" : "15"}
              strokeDasharray={`${strokeDasharray} ${CIRCUMFERENCE}`}
              transform={`rotate(${rotation} 50 50)`}
              style={{
                transition:
                  "stroke-width 0.2s ease, stroke-dasharray 1s ease-in-out",
              }}
            />
          );
        })}
      </svg>
    </Box>
  );
};

export default CustomDonutChart;
