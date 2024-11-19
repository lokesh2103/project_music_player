/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const audioRef = useRef(null);

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Set current time
  useEffect(() => {
    if (audioRef.current && seekTime !== audioRef.current.currentTime) {
      audioRef.current.currentTime = seekTime;
    }
  }, [seekTime]);

  // Play or pause audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <audio
      src={
        activeSong?.attributes?.previews[0]?.url ||
        activeSong?.hub?.actions?.[1].uri
      }
      ref={audioRef}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default React.memo(Player);
