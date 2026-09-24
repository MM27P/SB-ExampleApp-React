import { OneLineLabel } from '../OneLineLabel';
import { useTimer } from './useTimer';

export const Timer = () => {
  const timer = useTimer();

  return <OneLineLabel Label={'Timer'} Value={timer} />;
};
