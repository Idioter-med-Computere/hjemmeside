'use client'

import { useRef, useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react' // npm i lucide-react

type MiniPodcastPlayerProps = {
    src: string
    title: string
}

export default function MiniPodcastPlayer({ src, title }: MiniPodcastPlayerProps) {
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
        const m = Math.floor(time / 60)
        const s = Math.floor(time % 60)
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    return (
        <div className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
            <button
                onClick={togglePlay}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[--accent]/20 hover:bg-[--accent]/40 transition"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5 text-[--accent]" />
                ) : (
                    <Play className="w-5 h-5 text-[--accent]" />
                )}
            </button>

            <div className="flex-1 flex flex-col">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[--accent] transition-all"
                        style={{
                            width: duration ? `${(progress / duration) * 100}%` : '0%',
                        }}
                    />
                </div>
                <div className="text-[--text-dim] text-xs mt-1 flex justify-between">
                    <span>{formatTime(progress)}</span>
                    <span>{duration ? formatTime(duration) : '–:––'}</span>
                </div>
            </div>

            <audio ref={audioRef} src={src} preload="none" />
        </div>
    )
}