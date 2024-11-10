'use client'

import { useEffect, useRef } from 'react'

export function VideoStream() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            // @ts-ignore
            videoRef.current.srcObject = stream
          }
        })
        .catch(err => console.error("Error accessing media devices.", err))
    }
  }, [])

  return (
    <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto rounded-lg">
      Your browser does not support the video tag.
    </video>
  )
}