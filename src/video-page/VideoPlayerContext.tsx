import { createContext, PropsWithChildren, useState } from 'react';
import { IVideoData } from '../data/videosData';

function debounce(func: any, timeout = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}

export interface IVideoPlayerContext {
  activeVideo: IVideoData | null;
  setActiveVideo: (value: IVideoData) => void;
  clearActiveVideo: () => void;
}

export const VideoPlayerContext = createContext<IVideoPlayerContext>({
  activeVideo: null,
  setActiveVideo: () => {},
  clearActiveVideo: () => {}
});

export const VideoPlayerContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [activeVideo, setActiveVideo] = useState<IVideoData | null>(null);

  const handleSetActiveVideo = debounce(
    (video: IVideoData) => setActiveVideo(video),
    2000
  );

  const handleClearActiveVideo = () => {
    setActiveVideo(null);
  };

  return (
    <VideoPlayerContext.Provider
      value={{
        activeVideo,
        setActiveVideo: handleSetActiveVideo,
        clearActiveVideo: handleClearActiveVideo
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
};
