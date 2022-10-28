import {
  createContext,
  PropsWithChildren,
  RefObject,
  useRef,
  useState
} from 'react';
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
  activeThumbnailRef: RefObject<HTMLElement> | null;
  setCurrentActiveVideo: () => void;
  setActiveVideo: (value: IVideoData, itemRef: RefObject<HTMLElement>) => void;
  clearActiveVideo: () => void;
}

export const VideoPlayerContext = createContext<IVideoPlayerContext>({
  activeVideo: null,
  activeThumbnailRef: null,
  setCurrentActiveVideo: () => {},
  setActiveVideo: () => {},
  clearActiveVideo: () => {}
});

export const VideoPlayerContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [activeVideo, setActiveVideo] = useState<IVideoData | null>(null);
  const [activeThumbnailRef, setActiveThumbnailRef] =
    useState<RefObject<any> | null>(null);

  const setCurrentActiveVideo = () => {
    // console.log('setActiveVideo2');
    setActiveVideo(activeVideo);
    setActiveThumbnailRef(activeThumbnailRef);
  };

  const debouncedSetActiveVideo = debounce(
    (video: IVideoData, targetRef: RefObject<HTMLImageElement>) => {
      // console.log('debouncedSetActiveVideo');
      setActiveVideo(video);
      setActiveThumbnailRef(targetRef);
    },
    1000
  );

  const handleClearActiveVideo = () => {
    // console.log('handleClearActiveVideo');
    setActiveVideo(null);
    setActiveThumbnailRef(null);
  };

  const handleSetActiveVideo = (
    video: IVideoData,
    targetRef: RefObject<HTMLElement>
  ) => {
    // console.log('handleSetActiveVideo');
    handleClearActiveVideo();
    debouncedSetActiveVideo(video, targetRef);
  };

  return (
    <VideoPlayerContext.Provider
      value={{
        activeVideo,
        activeThumbnailRef,
        setCurrentActiveVideo,
        setActiveVideo: handleSetActiveVideo,
        clearActiveVideo: handleClearActiveVideo
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
};
