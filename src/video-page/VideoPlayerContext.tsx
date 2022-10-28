import { debounce } from 'lodash';
import { createContext, PropsWithChildren, useRef, useState } from 'react';

export interface IVideoPlayerContext {
  activeVideoId: number | null;
  activeElement: HTMLElement | null;
  setActiveVideoId: (id: string, target: HTMLElement) => void;
  clearActiveVideoId: () => void;
}

export const VideoPlayerContext = createContext<IVideoPlayerContext>({
  activeVideoId: null,
  activeElement: null,
  setActiveVideoId: () => {},
  clearActiveVideoId: () => {}
});

export const VideoPlayerContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const activeElementRef = useRef<HTMLElement | null>();

  const debouncedSetActiveVideoId = debounce(
    (id: string, targetEl: HTMLElement) => {
      // console.log('debouncedSetActiveVideoId', id);
      setActiveVideoId(+id);
      activeElementRef.current = targetEl;
    },
    1000
  );

  const handleSetActiveVideoId = (id: string, targetEl: HTMLElement) => {
    // console.log('handleSetActiveVideoId', id);
    debouncedSetActiveVideoId(id, targetEl);
  };

  const clearActiveVideoId = () => {
    if (!!activeVideoId) {
      // console.log('clearActiveVideoId');
      debouncedSetActiveVideoId.cancel();
      setActiveVideoId(null);
      activeElementRef.current = null;
    }
  };

  return (
    <VideoPlayerContext.Provider
      value={{
        activeVideoId,
        clearActiveVideoId,
        setActiveVideoId: handleSetActiveVideoId,
        activeElement: activeElementRef.current ?? null
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
};
