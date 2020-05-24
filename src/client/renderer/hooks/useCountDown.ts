import {
  useEffect,
  useState,
} from 'react';

export const useCountDown = (seconds: number): number => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    setTimer(seconds);

    const id = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [seconds]);

  return timer;
};