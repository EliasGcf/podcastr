import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  currentEpisodeIndex: number;
  episodeList: Episode[];
  hasPrevious: boolean;
  isShuffling: boolean;
  isPlaying: boolean;
  isLooping: boolean;
  hasNext: boolean;
  playNext: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  playPrevious: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  playList: (episodes: Episode[], index: number) => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext({} as PlayerContextData);

function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(episodes: Episode[], index: number) {
    setEpisodeList(episodes);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
    // setIsPlaying(false);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        hasPrevious,
        isShuffling,
        isPlaying,
        isLooping,
        hasNext,
        play,
        playList,
        playNext,
        togglePlay,
        toggleLoop,
        playPrevious,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

const usePlayer = () => {
  return useContext(PlayerContext);
};

export { PlayerContext, PlayerContextProvider, usePlayer };
