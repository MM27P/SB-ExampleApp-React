import type { Item } from '../../Model/Item';

export type FileLoaderProps = {
  handleFile: (e: any) => void;
  onSubmit: (items: Item[]) => void;
  onCancel: () => void;
  fileData: Item[];
};

export const FileLoader = ({
  handleFile,
  onSubmit,
  onCancel,
  fileData,
}: FileLoaderProps) => {
  return (
    <div className="file-loader-card">
      <div className="file-loader-header">
        <span className="settings-icon">⚛</span>
        <h2>File Loader</h2>
      </div>
      <div className="header-divider" />
      <input
        id="fileInput"
        className="file-hidden-input"
        type="file"
        accept=".json"
        onChange={handleFile}
      />
      <label htmlFor="fileInput" className="browse-btn">
        <span className="browse-icon">⚛</span>
        Przeglądaj plik JSON
      </label>
      <div className="json-viewer">
        <pre>
          {fileData ? JSON.stringify(fileData, null, 2) : 'No file loaded'}
        </pre>
      </div>

      <div className="file-loader-actions">
        <button
          className="primary-btn"
          onClick={() => {
            if (fileData) onSubmit(fileData);
          }}
        >
          Submit
        </button>

        <button className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
