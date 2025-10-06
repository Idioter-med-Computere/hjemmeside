'use client'

import Image from 'next/image'
import { useState } from 'react'

type AvatarProps = {
  src?: string
  alt: string
  initials: string
  className?: string
}

export default function Avatar({ src, alt, initials, className }: AvatarProps) {
  const [errored, setErrored] = useState(false)
  const showImage = src && !errored

  return (
    <div className={`relative rounded-full overflow-hidden ${className || ''}`}>
      {showImage ? (
        <Image src={src!} alt={alt} fill className="object-cover" onError={() => setErrored(true)} />
      ) : (
        <div className="w-full h-full rounded-full bg-[--panel-2] grid place-items-center text-3xl font-display">
          {initials}
        </div>
      )}
    </div>
  )
} 