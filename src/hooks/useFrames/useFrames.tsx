import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const fps = 10;

export function useFrames(fpsOverride: number = fps) {
  const [outFrames, setOutFrames] = useState(0);
  const frameRef = useRef(0);
  const timeoutWaiter = useRef<NodeJS.Timeout>();
  const lastTimeRef = useRef(performance.now());
  const fpsIntervalRef = useMemo(() => 1000 / fpsOverride, [fpsOverride]);

  const update = useCallback(() => {
    const now = performance.now();
    const elapsed = now - lastTimeRef.current;

    if (elapsed > fpsIntervalRef) {
      lastTimeRef.current = now - (elapsed % fpsIntervalRef);
      frameRef.current += 1;
      setOutFrames(frameRef.current);
    }

    timeoutWaiter.current = setTimeout(() => {
      requestAnimationFrame(update);
    }, fpsIntervalRef);
  }, [fpsIntervalRef]);

  useEffect(() => {
    clearTimeout(timeoutWaiter.current);
    update();
  }, [update]);

  return outFrames;
}