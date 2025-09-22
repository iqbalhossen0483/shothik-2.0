import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function SlidePreview({ src }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.3);

  const width = 1780;
  const height = 720;

  useEffect(() => {
    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const scaleX = containerWidth / width;
      const scaleY = containerHeight / height;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }} ref={containerRef}>
      <iframe
        src={src}
        referrerPolicy='origin'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: "none",
          overflow: "hidden",
          pointerEvents: "auto",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </Box>
  );
}

export default SlidePreview;
