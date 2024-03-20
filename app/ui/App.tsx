'use client'

import React, { useEffect, useRef, useState } from 'react';
import MusicPlayer from './MusicPlayer';
import FileUploader from './FileUploader';

export default function App() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    const fileName = file.name;
    audioRef.current = new Audio(url)
    setAudioUrl(url);
    setAudioName(fileName);
  }

  return (
    <div>
      <FileUploader onFileUpload={handleFileUpload} />
      {audioName && audioRef.current && (
        <MusicPlayer trackName={audioName} trackRef={audioRef.current} />
      )}
    </div>
  );
};


    // {audioUrl && (
    //   <audio controls>
    //     <source src={audioUrl} type="audio/mpeg" />
    //     Your browser does not support the audio element.
    //   </audio>
    // )}