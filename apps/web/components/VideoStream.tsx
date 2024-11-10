// app/components/VideoStream.tsx
"use client";

import { useEffect, useRef } from "react";

interface VideoStreamProps {
  stream: MediaStream | null;
  muted?: boolean;
  isRemote?: boolean;
}

export default function VideoStream({
  stream,
  muted = false,
  isRemote = false,
}: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        controls
        playsInline
        muted={!isRemote && muted}
        className="w-full rounded-lg bg-gray-900"
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <p className="text-white">Waiting for stream...</p>
        </div>
      )}
    </div>
  );
}
