import Header from './Header';
import GptSearch from './GptSearch';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header/>
      {showGptSearch 
        ? ( <GptSearch/> )
        : (
          <> 
            <MainContainer/>
            <SecondaryContainer/>
          </>
        )}
    </div>
  );
};

export default Browse