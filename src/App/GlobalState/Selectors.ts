import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { ReduxState } from './ReduxState';

export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;
