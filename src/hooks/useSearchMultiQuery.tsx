import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { getSearchMovie, getSearchTv, IGetMovieResult, IGetTvShowResult } from "../api";

export default function useSearchMultiQuery(
  keyword: string
): [UseQueryResult<IGetMovieResult>, UseQueryResult<IGetTvShowResult>] {
  const searchMovie = useQuery<IGetMovieResult>({
    queryKey: ["search", "movies"],
    queryFn: () => getSearchMovie(keyword),
  });
  const searchTv = useQuery<IGetTvShowResult>({
    queryKey: ["search", "tvShows"],
    queryFn: () => getSearchTv(keyword),
  });
  return [searchMovie, searchTv];
}
