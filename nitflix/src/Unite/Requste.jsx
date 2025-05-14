import axios from "./axios";

export default {
  getTrending: () => axios.get("/trending/all/week"),
  getNetflixOriginals: () => axios.get("/discover/tv?with_networks=213"),
  getTopRated: () => axios.get("/movie/top_rated"),
  getByGenre: (genreId) => axios.get(`/discover/movie?with_genres=${genreId}`),
  getVideo: (id, type = "movie") => axios.get(`/${type}/${id}/videos`),
  search: (query) => axios.get(`/search/multi?query=${query}`),
};
