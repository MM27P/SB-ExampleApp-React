import { useContext, useState } from 'react';
import { FileLoader } from './FileLoader';
import { AppContext } from '../../AppContext';
import type { Item } from '../../Model/Item';

export function FileLoaderContainer() {
  const { setLocalItems, setLoadFileOpen } = useContext(AppContext);
  const [fileData, setFileData] = useState<Item[] | null>(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const json = JSON.parse(event.target.result as string);
      setFileData(json);
    };

    reader.readAsText(file);
  };

  return (
    <FileLoader
      fileData={fileData}
      handleFile={handleFile}
      onSubmit={(items) => {
        setLocalItems(items);
        setLoadFileOpen(false);
      }}
      onCancel={() => {
        setLoadFileOpen(false);
      }}
    />
  );
}
