const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  id: number;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string;
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

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}
