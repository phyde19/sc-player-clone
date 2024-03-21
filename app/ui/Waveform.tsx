import { useEffect, useRef } from "react";

type Props = {
    trackBuffer: AudioBuffer;
}

export default function Waveform({ trackBuffer }: Props) {

    const waveformRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        drawWaveform(trackBuffer);
    }, [trackBuffer]);

    const drawWaveform = (buffer: AudioBuffer) => {
        if (!waveformRef) {
            return;
        } 
        const canvas = waveformRef.current!;
        const ctx = canvas.getContext('2d')!;

        const binCount = 180;
        const binWidth = 3;
        const binPadding = 1;

        canvas.width = binCount * (binWidth + binPadding) + 20;
        canvas.height = 64;

        const left = buffer.getChannelData(0); 
        const right = buffer.getChannelData(1); 
        const leftRightAvg = new Float32Array(left.length);
        for (let i = 0; i < left.length; i++) {
            leftRightAvg[i] = (Math.abs(left[i]) + Math.abs(right[i])) / 2;
        }
        drawToCanvas(
            leftRightAvg, 
            ctx, 
            binCount,
            binWidth,
            binPadding,
            canvas.height
        );
    };

    const drawToCanvas = (
        samples: Float32Array,
        ctx: CanvasRenderingContext2D, 
        maxBinCount: number,
        binWidth: number,
        binPadding: number,
        waveformHeight: number
    ) => {
        const sampleCount = samples.length;
        const binCount = Math.min(maxBinCount, sampleCount);
        const sampleGroupSize = Math.ceil(sampleCount / binCount);
        ctx.lineWidth = binWidth;
        ctx.strokeStyle = '#333';

        const waveformSamples: number[] = [];
        let maxSample = 0;
        for (let i = 0; i < binCount; i++) {
            const start = sampleGroupSize * i;
            const end = start + sampleGroupSize;
            waveformSamples.push(getWaveformSample(start, end, samples));
            if (waveformSamples[i] > maxSample) {
                maxSample = waveformSamples[i];
            }
        }
        const normalizedSamples = waveformSamples.map(v => v / maxSample * waveformHeight);
        console.log(normalizedSamples);
        for (let i = 0; i < normalizedSamples.length; i++) {
            const x = i * (binWidth + binPadding);
            const barHeight = normalizedSamples[i];
            drawWaveformSample(ctx, x, barHeight, waveformHeight);
        }
        ctx.stroke();
    }

    const drawWaveformSample = (
        ctx: CanvasRenderingContext2D, 
        x: number, 
        barHeight: number, 
        waveformHeight: number
    ) => { 
        ctx.moveTo(x, waveformHeight);
        ctx.lineTo(x, waveformHeight - barHeight);
    }

    const getWaveformSample = (start: number, end: number, normalizedSamples: Float32Array): number => {
        let sum = 0;
        for (let i = start; i < Math.min(end, normalizedSamples.length); i++) {
            sum += normalizedSamples[i];
        }
        return sum / (end - start);
    }

    return (
        <canvas ref={waveformRef} className="border">
        </canvas>
    )
}