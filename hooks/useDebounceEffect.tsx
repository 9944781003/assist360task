import { useState, useEffect, DependencyList, EffectCallback } from "react";

function useDebouncedEffect(
  effect: EffectCallback,
  deps: DependencyList,
  delay: number
) {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
  }, deps);

  useEffect(() => {
    if (isTyping) {
      const timerId = setTimeout(() => {
        effect();
        setIsTyping(false);
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [isTyping, delay, effect]);

  return isTyping;
}

export default useDebouncedEffect;
