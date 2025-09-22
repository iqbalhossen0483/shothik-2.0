import { useEffect, useState } from "react";

const useLoadingText = (loading) => {
  const [text, setText] = useState("Ana");

  useEffect(() => {
    if (!loading) {
      setText("");
      return;
    }
    const loadingSteps = [
      "Ana",
      "Analy",
      "Analyz",
      "Analyzing",
      "Analyzing.",
      "Analyzing..",
      "Analyzing...",
    ];
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % loadingSteps.length;
      setText(loadingSteps[stepIndex]);
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  return text;
};

export default useLoadingText;
