const BASE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  backdrop_path: string;
  id: number;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;

  genres: { id: number; name: string }[];

  id: number;

  overview: string;

  poster_path: string;

  release_date: string;

  title: string;
}

export interface ITvShow {
  backdrop_path: string;
  id: number;
  overview: string;
  release_date: string;
  name: string;
  poster_path: string;
}

export interface ITvShowDetail {
  adult: boolean;
  backdrop_path: string;

  genres: { id: number; name: string }[];

  id: number;

  overview: string;

  poster_path: string;

  created_date: string;

  name: string;
  seasons: { id: number; name: string }[];
}

export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  results: IMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface IGetTvShowResult {
  results: ITvShow[];
  total_pages: number;
  total_results: number;
  page: number;
}
export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getLatest() {
  return fetch(`${BASE_URL}/movie/latest?language=en-US`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getTopRated() {
  return fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getUpcoming() {
  return fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getAiringToday() {
  return fetch(`${BASE_URL}/tv/airing_today?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getTvPopular() {
  return fetch(`${BASE_URL}/tv/popular?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getTvTopRated() {
  return fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getTvLatest() {
  return fetch(`${BASE_URL}/tv/latest?language=en-US`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getMovieDetail(movieId: number) {
  return fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getTvDetail(tvShowId: number) {
  return fetch(`${BASE_URL}/tv/${tvShowId}?language=en-US`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getSearchMovie(keyword: string) {
  return fetch(`${BASE_URL}/search/movie?query=${keyword}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}

export function getSearchTv(keyword: string) {
  return fetch(`${BASE_URL}/search/tv?query=${keyword}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}
