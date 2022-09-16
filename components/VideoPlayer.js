import { createNewHls, isHlsSupported } from 'livepeer';
import * as React from 'react';

export function VideoPlayer({
  hlsConfig,
  playerRef = React.createRef(),
  src,
  width = '100%',
  autoPlay = true,
  ...props
}) {
  React.useEffect(() => {
    if (
      playerRef.current &&
      typeof window !== 'undefined' &&
      isHlsSupported()
    ) {
      const { destroy } = createNewHls(src, playerRef.current, {
        ...hlsConfig,
      });

      return () => {
        destroy();
      };
    }
  }, [autoPlay, hlsConfig, playerRef, src]);

  // if Media Source is supported, use HLS.js to play video
  if (typeof window !== 'undefined' && isHlsSupported())
    return (
      <video
        aria-label="video-player"
        role="video"
        ref={playerRef}
        width={width}
        controls
        {...props}
      />
    );

  // fallback to using a regular video player if HLS is supported by default in the user's browser
  return (
    <video
      aria-label="video-player"
      role="video"
      ref={playerRef}
      src={src}
      autoPlay={autoPlay}
      width={width}
      controls
      {...props}
    />
  );
}
