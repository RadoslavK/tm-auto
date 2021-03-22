import {
  useEffect,
  useState, 
} from 'react';

export const useCountDown = (seconds: number): number => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    setTimer(seconds);

    const id = window.setInterval(() => {
      setTimer((prevTimer) => Math.max(0, prevTimer - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [seconds]);

  return timer;
};
