import { useTimer } from './useTimer';

export const Timer = () => {
  const timer = useTimer();

  return <div>Timer: {timer}</div>;
};
