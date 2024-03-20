import React, { useState } from "react";
import PlayButton from "./PlayButton";

type Props = {
    trackName: string;
    trackRef: HTMLAudioElement;
}

export default function MusicPlayer({ trackName, trackRef }: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const togglePlayPause = (e: React.MouseEvent<HTMLElement>) => {
        setIsPlaying(isPlaying => !isPlaying);
    }

    return (
        <div className="border-black mt-10">
            <PlayButton isPlaying={isPlaying} onPlayPause={togglePlayPause} />
        </div>
    )
}