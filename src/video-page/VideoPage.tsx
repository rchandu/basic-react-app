import { MouseEvent, useContext } from 'react';
import { sampleVideoData } from '../data/videosData';
import { VideoItem } from './VideoItem';
import './videoPage.css';
import { VideoPlayer } from './VideoPlayer';
import { VideoPlayerContext } from './VideoPlayerContext';
import { YoutubeIcon } from './YoutubeIcon';

export const VideoPage: React.FC = () => {
  const { setActiveVideoId, clearActiveVideoId } =
    useContext(VideoPlayerContext);

  const handleMouseMove = (ev: MouseEvent) => {
    const currentTarget = ev.target as HTMLDivElement;
    const targetVideoId = currentTarget.getAttribute('data-video-id');
    if (targetVideoId) {
      // console.log('Hovered on', targetVideoId);
      setActiveVideoId(targetVideoId, currentTarget);
    } else {
      const targetId = currentTarget.getAttribute('data-id');
      if (targetId !== 'video-player') {
        clearActiveVideoId();
      }
    }
  };

  return (
    <div className="videoPage" onMouseMove={handleMouseMove}>
      <div className="videoPageHeader">
        <div className="videoPageHeaderIcon">
          <YoutubeIcon />
        </div>
        <div className="videoPageHeaderSearch">
          <input
            className="videoPageHeaderSearchInput"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <VideoPlayer />
      <div className="videoPageBody">
        <div className="videoList">
          {sampleVideoData.map((x) => (
            <VideoItem key={x.personalization_id} item={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
