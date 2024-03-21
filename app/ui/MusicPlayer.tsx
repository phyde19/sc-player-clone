import React, { useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import Waveform from "./Waveform";

type Props = {
    trackName: string;
    track: HTMLAudioElement;
    trackBuffer: AudioBuffer;
}

export default function MusicPlayer({ trackName, track, trackBuffer }: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const togglePlayPause = (e: React.MouseEvent<HTMLElement>) => {
        setIsPlaying(isPlaying => !isPlaying);
    }

    useEffect(() => {
        setIsPlaying(false);
    }, [track])

    useEffect(() => {
        if (isPlaying) {
            track.play();
        } else {
            track.pause();
        }
    }, [isPlaying])

    return (
        <div className="border-black mt-10">
            <div className="flex items-center text-200 mb-2">
                <PlayButton isPlaying={isPlaying} onPlayPause={togglePlayPause} />
                <span className="ml-2">
                    {trackName}
                </span>
            </div>
            <Waveform trackBuffer={trackBuffer} />
        </div>
    )
}