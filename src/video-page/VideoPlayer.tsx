import { useContext, useEffect, useRef } from 'react';
import { VideoPlayerContext } from './VideoPlayerContext';
import './videoPlayer.css';

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoPlayerContext = useContext(VideoPlayerContext);

  useEffect(() => {
    if (videoRef.current) {
      const { activeVideo, activeThumbnailRef } = videoPlayerContext;
      if (activeVideo) {
        try {
          if (containerRef?.current && activeThumbnailRef?.current) {
            const thumbnailEl = activeThumbnailRef.current;
            const containerEl = containerRef.current;
            containerEl.style.left = thumbnailEl.offsetLeft + 'px';
            containerEl.style.top = thumbnailEl.offsetTop + 'px';
            containerEl.style.height = thumbnailEl.clientHeight + 'px';
            containerEl.style.width = thumbnailEl.clientWidth + 'px';
            containerEl.classList.add('videoPlayerActive');
          }
          videoRef.current.src = activeVideo.video_url;
          videoRef.current.play();
        } catch (err) {}
      } else {
        const containerEl = containerRef.current;
        if (containerEl) {
          containerEl.style.height = '0px';
          containerEl.style.width = '0px';
          containerEl.style.top = '0px';
          containerEl.style.left = '0px';
          containerEl.classList.remove('videoPlayerActive');
        }
        videoRef.current.src = '';
        videoRef.current.pause();
      }
    }
  }, [videoPlayerContext, videoRef]);

  return (
    <div
      ref={containerRef}
      className="videoPlayer"
      onMouseOver={(ev) => {
        // console.log('Mouse on video player');
        ev.stopPropagation();
        videoPlayerContext.setCurrentActiveVideo();
      }}
      onMouseOut={() => {
        // console.log('mouseout on videoPlayer');
        videoPlayerContext.clearActiveVideo();
      }}
    >
      <video ref={videoRef} autoPlay height={200} width={200}>
        <source type="video/mp4" src={''} width={200} height={200} />
      </video>
    </div>
  );
};
