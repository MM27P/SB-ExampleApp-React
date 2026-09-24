import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import ReduxStore from './App//GlobalState/ReduxState.ts'; //old version of redux
import { RTKStore } from './App/GlobalState/RTKState.ts';
import App from './App/App-II refactor- context and containers.tsx';

const new1 = [
  { id: 1, name: 'text', value: 12, date: new Date() },
  { id: 2, name: 'text2', value: 13, date: new Date() },
  { id: 3, name: 'text3', value: 14, date: new Date() },
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={RTKStore}>
      <App items={new1} />
    </Provider>
  </StrictMode>
);
