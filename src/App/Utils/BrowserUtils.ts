//DWA SPOSOBY ZAPISU FUNKCJI

import type { Item } from '../Model/Item';

//1 SPOSÓB - CLASSIC
export function downloadJSON(data) {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  a.click();

  URL.revokeObjectURL(url);
}

//2 SPOSÓB - UŻYCIĘ LAMBY =>
export const saveToLocalStorage = (items: Item[]) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const loadFromLocalStorage = () => {
  let json = localStorage.getItem('items');
  return json ? JSON.parse(json) : [];
};
