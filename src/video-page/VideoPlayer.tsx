import { useContext, useEffect, useRef } from 'react';
import { sampleVideoData } from '../data/videosData';
import './videoPlayer.css';
import { VideoPlayerContext } from './VideoPlayerContext';

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoPlayerContext = useContext(VideoPlayerContext);

  useEffect(() => {
    if (videoRef.current) {
      const { activeVideoId, activeElement } = videoPlayerContext;
      const activeVideo = sampleVideoData.find(
        (x) => x.personalization_id === activeVideoId
      );
      console.log('rendering video: ', activeVideoId);
      if (activeVideo) {
        console.log({ activeVideoId, activeElement });
        try {
          if (containerRef?.current && activeElement) {
            const thumbnailEl = activeElement;
            const containerEl = containerRef.current;
            if (thumbnailEl.clientHeight !== containerEl.clientHeight) {
              containerEl.style.height = thumbnailEl.clientHeight + 'px';
            }
            if (thumbnailEl.clientWidth !== containerEl.clientWidth) {
              containerEl.style.width = thumbnailEl.clientWidth + 'px';
            }
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
          // containerEl.style.height = '0px';
          // containerEl.style.width = '0px';
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
    </div>
  );
};
