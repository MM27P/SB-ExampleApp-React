import type { ComponentType } from 'react';
import { type OneLineLabelProps } from '../OneLineLabel';
import { useTimer } from './useTimer';

export const withTimer = (Component: ComponentType<OneLineLabelProps>) => {
  return function WrappedComponent(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    const timer = useTimer();
    return <Component {...props} Label={'Timer'} Value={timer} />;
  };
};
