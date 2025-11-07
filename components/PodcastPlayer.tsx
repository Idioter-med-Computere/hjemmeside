'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

type PodcastPlayerProps = {
    src: string
}

export default function PodcastPlayer({ src }: PodcastPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) audio.pause()
        else audio.play()
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onPlay = () => setIsPlaying(true)
        const onPause = () => setIsPlaying(false)
        const onTime = () => setProgress(audio.currentTime)
        const onLoaded = () => setDuration(audio.duration)

        audio.addEventListener('play', onPlay)
        audio.addEventListener('pause', onPause)
        audio.addEventListener('timeupdate', onTime)
        audio.addEventListener('loadedmetadata', onLoaded)
        return () => {
            audio.removeEventListener('play', onPlay)
            audio.removeEventListener('pause', onPause)
            audio.removeEventListener('timeupdate', onTime)
            audio.removeEventListener('loadedmetadata', onLoaded)
        }
    }, [])

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return '0:00'
        const m = Math.floor(time / 60)
        const s = Math.floor(time % 60)
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const progressPercent = duration ? (progress / duration) * 100 : 0

    return (
        <div className="relative bg-[#121212] border border-white/10 rounded-xl px-6 py-5 shadow-[0_0_20px_rgba(155,93,229,0.08)]">
            {/* Label */}
            <p className="font-display text-white text-lg mb-3 tracking-wide">Afspil episode</p>

            {/* Progressbar */}
            <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-[--accent] transition-all"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-between text-[--text-dim] text-sm">
                <button
                    onClick={togglePlay}
                    className="flex items-center justify-center text-[--accent] hover:text-white transition w-8 h-8"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6" strokeWidth={2.5} />
                    ) : (
                        <Play className="w-6 h-6 ml-[1px]" strokeWidth={2.5} />
                    )}
                </button>

                <div className="flex gap-2 text-[--text-dim] text-xs">
                    <span>{formatTime(progress)}</span>
                    <span>/</span>
                    <span>{duration ? formatTime(duration) : '–:––'}</span>
                </div>
            </div>

            <audio ref={audioRef} src={src} preload="none" />
        </div>
    )
}