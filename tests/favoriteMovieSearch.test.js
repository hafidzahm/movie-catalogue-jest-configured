import { spyOn } from 'jest-mock';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Searching movies', () => {
  let presenter;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
          </ul>
        </div>
      </div>
    `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteMovieIdb, 'searchMovies');
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies: FavoriteMovieIdb,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    FavoriteMovieIdb.searchMovies.mockImplementation(() => []);
    searchMovies('film a');

    expect(presenter.latestQuery).toEqual('film a');
  });
  it('should ask the model to search for liked movies', () => {
    FavoriteMovieIdb.searchMovies.mockImplementation(() => []);
    searchMovies('film a');

    expect(FavoriteMovieIdb.searchMovies).toHaveBeenCalledWith('film a');
  });
  it('should show the title of the found movies', () => {
    presenter._showFoundMovies([
      {
        id: 1,
        title: 'Satu',
      },
      {
        id: 2,
        title: 'Dua',
      },
    ]);
    const movieTitles = document.querySelectorAll('.movie__title');
    expect(movieTitles.item(0).textContent).toEqual('Satu');
    expect(movieTitles.item(1).textContent).toEqual('Dua');
  });
  it('should show - for found movie without title', () => {
    presenter._showFoundMovies([{ id: 1 }]);
    expect(document.querySelectorAll('.movie__title').item(0).textContent).toEqual('-');
  });
  it('should show the name of the movies found by Favorite Movies', (done) => {
    document
      .getElementById('movie-search-container')
      .addEventListener('movies:searched:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('film abc');
        expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
        expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
        done();
      });
    FavoriteMovieIdb.searchMovies.mockImplementation((query) => {
      if (query === 'film a') {
        return [
          { id: 111, title: 'film abc' },
          { id: 222, title: 'ada juga film abcde' },
          { id: 333, title: 'ini juga boleh film a' },
        ];
      }
      return [];
    });
    searchMovies('film a');
  });

  describe('When query is not empty', () => {
    /* ...kode lainnya disembunyikan... */
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchMovies(' ');
      expect(presenter.latestQuery.length).toEqual(0);
     
      searchMovies('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchMovies('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });
});
