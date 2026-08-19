import { useState } from 'react'

const FALLBACK_BG = '#F4C2C2'

export default function ImageWithFallback({ src, alt, className = '', ...props }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-blush/30 ${className}`}
        style={{ backgroundColor: FALLBACK_BG }}
        aria-label={alt || 'Image unavailable'}
      >
        <span className="text-chocolate/40 text-sm font-medium text-center px-2">
          {alt || 'Image unavailable'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      {...props}
    />
  )
}
