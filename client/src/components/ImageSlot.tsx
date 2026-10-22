import { useState } from 'react'

interface ImageSlotProps {
  src: string
  alt: string
  label: string
  className?: string
  objectPosition?: string
}

export default function ImageSlot({ src, alt, label, className = '', objectPosition }: ImageSlotProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
        data-placeholder="true"
        className={`flex items-center justify-center bg-surface text-center text-[10px] text-ink/75 ${className}`}
      >
        {label}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={objectPosition ? { objectPosition } : undefined}
      className={`object-cover ${className}`}
    />
  )
}
