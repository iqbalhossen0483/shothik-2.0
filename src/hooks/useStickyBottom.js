import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useResponsive from "./useResponsive";

export default function useStickyBottom(height) {
  const isMobile = useResponsive("down", "sm");
  const isMd = useResponsive("down", "md");
  const [isSticky, setIsSticky] = useState(false);
  const { themeLayout } = useSelector((state) => state.settings);
  const [elementRef, setElementRef] = useState(null);
  const [originalPosition, setOriginalPosition] = useState(null);
  const isMini = themeLayout === "mini";

  // Function to calculate and store the element's original position
  const measureElement = useCallback(() => {
    if (!isMd) return; //  Early return if not mobile

    if (elementRef) {
      const position = elementRef.getBoundingClientRect().top + window.scrollY;
      setOriginalPosition(position);
    }
  }, [elementRef, isMd]);

  // Handle scroll events
  useEffect(() => {
    if (!isMd) return; //  Early return if not mobile

    const handleScroll = () => {
      if (!originalPosition) return;

      const currentScroll = window.scrollY;

      if (currentScroll === 0) {
        setIsSticky(false);
      } else if (currentScroll >= height) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Measure element position on mount and resize
    measureElement();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", measureElement);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureElement);
    };
  }, [originalPosition, elementRef, measureElement, height, isMd]);

  // Ref callback to get the element reference
  const ref = useCallback((element) => {
    if (element) {
      setElementRef(element);
    }
  }, []);

  return {
    ref,
    style: isMd
      ? {
          position: isSticky ? "sticky" : "fixed",
          bottom: !isSticky ? 0 : "auto",
          top: isSticky ? 0 : "auto",
          width: isMobile ? "93%" : isMini ? "79.5%" : "56%",
          zIndex: 1000,
          margin: isSticky ? "" : "auto",
          left: isSticky ? "" : isMobile ? "50%" : isMini ? "56%" : "68%",
          transform: isSticky ? "" : "translateX(-50%)",
          paddingX: 1,
        }
      : undefined,
  };
}
