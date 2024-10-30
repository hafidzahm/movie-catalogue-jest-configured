/* eslint-disable max-len */

import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  // Agar kode di atas selalu dijalankan untuk tiap tes yang dibuat, kita dapat menggunakan method beforeEach
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the movie has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  it('should not show the unlike button when the movie has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  it('should be able to like the movie', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    // Menyimulasikan widget ditekan.
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // Memastikan film berhasil disukai
    const movie = await FavoriteMovieIdb.getMovie(1);
    expect(movie).toEqual({ id: 1 });
    // eslint-disable-next-line max-len
    // unit test mungkin ada yang berisi id: sehingga gagal (karena jest menjalankan test secara acak  ), solusinya hapus dulu id nya
    await FavoriteMovieIdb.deleteMovie(1);
  });

  it('should not add a movie again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteMovieIdb.putMovie({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // Tidak ada film yang ganda
    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);
    await FavoriteMovieIdb.deleteMovie(1);
  });

  it('should not add a movie when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie([{ movie: {} }]);

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
