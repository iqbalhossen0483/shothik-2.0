"use client";
import { useEffect, useRef } from "react";

/**
 * Custom hook that detects clicks outside of a given element.
 * @param {Function} callback - Function to call when the click is detected outside.
 * @returns {Object} Ref to attach to the element you want to detect outside clicks for.
 */
export const useOutsideClick = (callback) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return elementRef;
};
