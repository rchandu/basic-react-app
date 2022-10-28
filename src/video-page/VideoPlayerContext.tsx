import { debounce } from 'lodash';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useRef,
  useState
} from 'react';

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
  const idRef = useRef<number | null>(null);
  const activeElementRef = useRef<HTMLElement | null>();

  const debouncedSetActiveVideoId = useCallback(
    debounce((id: number, targetEl: HTMLElement) => {
      // console.info(`%c debouncedSetActiveVideoId ${id}`, 'color: green');
      setActiveVideoId(id);
      idRef.current = id;
      activeElementRef.current = targetEl;
    }, 1000),
    []
  );

  const handleSetActiveVideoId = (id: string, targetEl: HTMLElement) => {
    const idVal = +id;
    // console.log({ idVal, idRef: idRef.current });
    if (!!idRef.current && idRef.current !== idVal) {
      // console.log('%c Somethign here bro', 'color: red');
      clearActiveVideoId();
    }
    // console.log('%c handleSetActiveVideoId', 'color: #aab');
    debouncedSetActiveVideoId(idVal, targetEl);
  };

  const clearActiveVideoId = () => {
    if (!!idRef.current) {
      // console.log(`%c clearActiveVideoId ${activeVideoId}`, 'color: yellow;');
      debouncedSetActiveVideoId.cancel();
      setActiveVideoId(null);
      idRef.current = null;
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
