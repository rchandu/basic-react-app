import { createContext, PropsWithChildren, useRef, useState } from 'react';

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

  // const debouncedSetActiveVideoId = debounce((id: string) => {
  const debouncedSetActiveVideoId = debounce(
    (id: string, targetEl: HTMLElement) => {
      console.log('debouncedSetActiveVideoId2', id);
      activeElementRef.current = targetEl;
      setActiveVideoId(+id);
    },
    1000
  );

  const handleSetActiveVideoId = (id: string, targetEl: HTMLElement) => {
    console.log('handleSetActiveVideoId', id);
    // activeElementRef.current = targetEl;
    // debouncedSetActiveVideoId(id);
    if (activeVideoId !== +id) {
      clearActiveVideoId();
    }
    debouncedSetActiveVideoId(id, targetEl);
  };

  const clearActiveVideoId = () => {
    if (!!activeVideoId) {
      console.log('clearActiveVideoId');
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
