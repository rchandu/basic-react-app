import { useContext, useRef } from 'react';
import { IVideoData } from '../data/videosData';
import './videoItem.css';
import { VideoPlayerContext } from './VideoPlayerContext';

interface Props {
  item: IVideoData;
}

export const VideoItem: React.FC<Props> = ({ item }) => {
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const { setActiveVideo, clearActiveVideo } = useContext(VideoPlayerContext);

  const handleMouseOver = () => setActiveVideo(item, thumbnailRef);
  const handleMouseOut = () => clearActiveVideo();

  return (
    <div className="videoItem">
      <img
        ref={thumbnailRef}
        src={item.thumbnail_url}
        alt={`Thumbnail for ${item.personalization_id}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
};
