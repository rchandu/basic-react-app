import { sampleVideoData } from '../data/videosData';
import { VideoItem } from './VideoItem';
import './videoPage.css';
import { VideoPlayer } from './VideoPlayer';
import { YoutubeIcon } from './YoutubeIcon';

export const VideoPage: React.FC = () => {
  return (
    <div className="videoPage">
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
