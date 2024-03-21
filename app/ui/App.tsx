'use client'

import React, { useEffect, useRef, useState } from 'react';
import MusicPlayer from './MusicPlayer';
import FileUploader from './FileUploader';

export default function App() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = async (file: File) => {
    if (audioRef.current) {
      // stop audio (eject if you will)
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const url = URL.createObjectURL(file);
    const audioContext = new AudioContext();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    console.log(audioBuffer);
    audioRef.current = new Audio(url)
    setAudioUrl(url);
    setAudioName(file.name);
    setAudioBuffer(audioBuffer);
  }

  return (
    <>
      <FileUploader onFileUpload={handleFileUpload} />
      {audioName && audioRef.current && (
        <MusicPlayer trackName={audioName} track={audioRef.current} />
      )}
    </>
  );
};


    // {audioUrl && (
    //   <audio controls>
    //     <source src={audioUrl} type="audio/mpeg" />
    //     Your browser does not support the audio element.
    //   </audio>
    // )}