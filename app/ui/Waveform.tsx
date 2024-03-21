import { useEffect, useRef } from "react";

type Props = {
    track: HTMLAudioElement;
}

export default function Waveform({ track }: Props) {

    const waveformRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = waveformRef.current!;
        const ctx = canvas.getContext('2d');

        // this may or may not be necessary
        const audioContext = new AudioContext();

        // Insert code here to analyze the track and display time domain
        // information in canvas element. 

        // You should accomplish this by drawing thin rectangles corresponding to the signal at a fairly fine grain
        // The end result should be similar to the soundcloud audio waveform

    }, [track]);

    return (
        <canvas ref={waveformRef} className="border">

        </canvas>
    )
}