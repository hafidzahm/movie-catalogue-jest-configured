import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';

describe('Searching movies', () => {
  beforeEach(() => {
    document.body.innerHTML = `
          <div id="movie-search-container">
            <input id="query" type="text">
            <div class="movie-result-container">
              <ul class="movies">
              </ul>
            </div>
          </div>
        `;
  });

  it('should be able to capture the query typed by the user', () => {
    const presenter = new FavoriteMovieSearchPresenter();
    const queryElement = document.getElementById('query');
    queryElement.value = 'film a';
    queryElement.dispatchEvent(new Event('change'));
    expect(presenter.latestQuery).toEqual('film a');
  });
  it('should ask the model to search for liked movies', () => {
    // eslint-disable-next-line no-unused-vars
    const presenter = new FavoriteMovieSearchPresenter();
    const queryElement = document.getElementById('query');
    queryElement.value = 'film a';
    queryElement.dispatchEvent(new Event('change'));
  });
});
