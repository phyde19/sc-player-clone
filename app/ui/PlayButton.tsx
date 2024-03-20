import { PlayIcon, PauseIcon } from "@heroicons/react/16/solid";
import React from "react";

type Props = {
    isPlaying: boolean;
    onPlayPause: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function PlayButton({ isPlaying, onPlayPause }: Props) {

    const iconStyle = "text-gray-800 w-10 h-10";

    return (
        <button 
            className="w-16 h-16 rounded-full bg-transparent border-[.5px] border-gray-600 flex items-center justify-center"
            onClick={onPlayPause} 
        >
            {isPlaying ? (
                <PauseIcon className={`${iconStyle}`}/> 
            ) : (
                <PlayIcon className={`${iconStyle} pl-1`}/>
            )}
        </button>
    )
}