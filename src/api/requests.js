const requests = {
  fetchNowPlaying: `/movie/now_playing`,
  fetchNetflixOriginals: `/discover/tv?width_network=213`,
  fetchTrending: `/trending/all/week`,
  fetchTopRated: `/movie/top_rated`,
  fetchActionMovies: `/discover/moovie?width_genres=28`,
  fetchComedyMovies: `/discover/moovie?width_genres=35`,
  fetchHorrorMovies: `/discover/moovie?width_genres=27`,
  fetchRomancenMovies: `/discover/moovie?width_genres=10749`,
  fetchDocumentaries: `/discover/moovie?width_genres=99`,
}

export default requests;