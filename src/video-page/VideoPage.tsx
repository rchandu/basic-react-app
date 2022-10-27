import { sampleVideoData } from '../data/videosData';
import './videoPage.css';
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
      <div className="videoPageBody">
        <div className="videoList">
          {sampleVideoData.map((x) => (
            <div className="videoItem">
              <img src={x.thumbnail_url} alt="Image thumbnail" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
