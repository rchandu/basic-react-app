import { useContext, useEffect, useMemo, useRef } from 'react';
import { sampleVideoData } from '../data/videosData';
import './videoPlayer.css';
import { VideoPlayerContext } from './VideoPlayerContext';

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeElement, activeVideoId } = useContext(VideoPlayerContext);

  useEffect(() => {
    if (videoRef.current) {
      const activeVideo = sampleVideoData.find(
        (x) => x.personalization_id === activeVideoId
      );
      // console.log('rendering video: ', activeVideoId);
      if (activeVideo) {
        // console.log({ activeVideoId, activeElement });
        try {
          if (containerRef?.current && activeElement) {
            const thumbnailEl = activeElement;
            const containerEl = containerRef.current;
            containerEl.style.height = thumbnailEl.clientHeight + 40 + 'px';
            containerEl.style.width = thumbnailEl.clientWidth + 'px';
            containerEl.style.left = thumbnailEl.offsetLeft + 'px';
            containerEl.style.top = thumbnailEl.offsetTop + 'px';
            containerEl.classList.add('videoPlayerActive');
          }
          videoRef.current.src = activeVideo.video_url;
          videoRef.current.play();
        } catch (err) {}
      } else {
        const containerEl = containerRef.current;
        if (containerEl) {
          // containerEl.style.top = '0px';
          // containerEl.style.left = '0px';
          containerEl.classList.remove('videoPlayerActive');
        }
        videoRef.current.src = '';
        videoRef.current.pause();
      }
    }
  }, [videoRef, activeVideoId]);

  const currentActiveVideo = useMemo(
    () => sampleVideoData.find((x) => x.personalization_id === activeVideoId),
    [activeVideoId]
  );

  return (
    <div ref={containerRef} className="videoPlayer" data-id="video-player">
      <video
        data-id="video-player"
        ref={videoRef}
        autoPlay
        height={200}
        width={200}
      >
        <source type="video/mp4" src="" width={200} height={200} />
      </video>
      {currentActiveVideo && (
        <div data-id="video-player" className="videoPlayerBody">
          Showing video for:{' '}
          <strong>{currentActiveVideo.personalization_id}</strong>
        </div>
      )}
    </div>
  );
};
