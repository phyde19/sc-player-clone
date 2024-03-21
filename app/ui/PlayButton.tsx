import { PlayIcon, PauseIcon } from "@heroicons/react/16/solid";
import React from "react";

type Props = {
    isPlaying: boolean;
    onPlayPause: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function PlayButton({ isPlaying, onPlayPause }: Props) {

    return (
        <button 
            className="w-12 h-12 rounded-full bg-transparent border-[.5px] border-gray-600 flex items-center justify-center"
            onClick={onPlayPause} 
        >
            {isPlaying ? (
                <PauseIcon className="text-gray-800 w-6 h-6"/> 
            ) : (
                <PlayIcon className="text-gray-800 w-7 h-7 pl-1"/>
            )}
        </button>
    )
}