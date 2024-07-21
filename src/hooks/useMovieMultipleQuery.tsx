import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { getLatest, getMovies, getTopRated, getUpcoming, IGetMovieResult, IMovie } from "../api";

export default function useMovieMultipleQuery(): [
  UseQueryResult<IGetMovieResult>,
  UseQueryResult<IMovie>,
  UseQueryResult<IGetMovieResult>,
  UseQueryResult<IGetMovieResult>
] {
  const nowPlaying = useQuery<IGetMovieResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  const latest = useQuery({
    queryKey: ["movies", "latest"],
    queryFn: getLatest,
  });
  const topRated = useQuery({
    queryKey: ["movies", "topRated"],
    queryFn: getTopRated,
  });
  const upcoming = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcoming,
  });
  return [nowPlaying, latest, topRated, upcoming];
}
