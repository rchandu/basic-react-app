import { useContext, useEffect, useRef } from 'react';
import { VideoPlayerContext } from './VideoPlayerContext';
import './videoPlayer.css';

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { activeVideo } = useContext(VideoPlayerContext);

  useEffect(() => {
    if (videoRef.current) {
      if (activeVideo) {
        videoRef.current.src = activeVideo.video_url;
        console.log('SHould be playing');
        console.log({ video: activeVideo.video_url });
        try {
          videoRef.current.play();
        } catch (err) {}
      } else {
        videoRef.current.src = '';
        videoRef.current.pause();
      }
    }
  }, [activeVideo, videoRef]);

  return (
    <div className="videoPlayer">
      <video ref={videoRef} autoPlay height={200} width={200}>
        <source
          type="video/mp4"
          src={activeVideo?.video_url ?? ''}
          width={200}
          height={200}
        />
      </video>
    </div>
  );
};
