import { useRef } from 'react';
import { IVideoData } from '../data/videosData';
import './videoItem.css';

interface Props {
  item: IVideoData;
}

export const VideoItem: React.FC<Props> = ({ item }) => {
  const thumbnailRef = useRef<HTMLImageElement>(null);
  return (
    <div
      className="videoItem"
      data-hoverable-video={true}
      data-video-id={item.personalization_id}
    >
      <img
        data-hoverable-video={true}
        data-video-id={item.personalization_id}
        ref={thumbnailRef}
        src={item.thumbnail_url}
        alt={`Thumbnail for ${item.personalization_id}`}
      />
    </div>
  );
};
