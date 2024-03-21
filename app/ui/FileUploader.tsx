import React, { ChangeEvent, useRef } from 'react';

type Props = {
    onFileUpload: (file: File) => Promise<void>;
}

export default function FileUploader({ onFileUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }
    onFileUpload(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="text-base p-3 border text-black border-black rounded"
      >
        Upload Track
      </button>
    </div>
  );
};