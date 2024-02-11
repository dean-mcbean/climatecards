import { skip } from 'node:test';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export function useFrames(fastForwarding: boolean, paused: boolean) {
  const skippedFrames = useMemo(() => fastForwarding ? 10 : 0, [fastForwarding]);
  const [frames, setFrames] = useState(0);
  const timeoutWaiter = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeoutWaiter.current.forEach((timeout) => {
      clearTimeout(timeout);
    });
    timeoutWaiter.current = [];
  }

  const update = useCallback(() => {
    setFrames((frames) => frames + 1 + skippedFrames);

    timeoutWaiter.current.push(
      setTimeout(() => {
        requestAnimationFrame(update);
      }, 100)
    );
  }, [skippedFrames]);

  useEffect(() => {
    if (!paused) update();
    return () => {
      clearTimeouts();
    };
  }, [update, paused]);

  return frames;
}