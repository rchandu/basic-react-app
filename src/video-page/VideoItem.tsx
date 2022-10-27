import { useContext } from 'react';
import { IVideoData } from '../data/videosData';
import './videoItem.css';
import { VideoPlayerContext } from './VideoPlayerContext';

interface Props {
  item: IVideoData;
}

export const VideoItem: React.FC<Props> = ({ item }) => {
  const videoPlayerContext = useContext(VideoPlayerContext);

  const handleMouseOver = () => videoPlayerContext.setActiveVideo(item);
  const handleMouseOut = () => videoPlayerContext.clearActiveVideo();

  return (
    <div className="videoItem">
      <img
        src={item.thumbnail_url}
        alt={`Thumbnail for ${item.personalization_id}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
};
