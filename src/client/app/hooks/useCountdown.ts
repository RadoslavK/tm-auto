import {
  useEffect,
  useState,
} from 'react';

export const useCountdown = (seconds: number) => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    setTimer(seconds);
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer <= 0) {
        clearInterval(interval);
      } else {
        setTimer(prevTime => Math.max(0, prevTime - 1));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return timer;
};
