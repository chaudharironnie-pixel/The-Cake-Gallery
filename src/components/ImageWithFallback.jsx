import { useState } from 'react'
import fallbackImg from '../assets/fallback-cake.svg'

export default function ImageWithFallback({ src, alt, className = '', ...props }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [errored, setErrored] = useState(false)

  return (
    <img
      src={errored ? fallbackImg : imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!errored) {
          setImgSrc(fallbackImg)
          setErrored(true)
        }
      }}
      {...props}
    />
  )
}
