import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { getAiringToday, getTvLatest, getTvPopular, getTvTopRated, IGetTvShowResult, ITvShow } from "../api";

export default function useTvMultiQuery(): [
  UseQueryResult<IGetTvShowResult>,
  UseQueryResult<IGetTvShowResult>,
  UseQueryResult<IGetTvShowResult>,
  UseQueryResult<ITvShow>
] {
  const airingToday = useQuery<IGetTvShowResult>({
    queryKey: ["tvShows", "airingToday"],
    queryFn: getAiringToday,
  });
  const popular = useQuery<IGetTvShowResult>({
    queryKey: ["tvShows", "popular"],
    queryFn: getTvPopular,
  });
  const topRated = useQuery<IGetTvShowResult>({
    queryKey: ["tvShows", "topRated"],
    queryFn: getTvTopRated,
  });
  const latest = useQuery<ITvShow>({
    queryKey: ["tvShows", "latest"],
    queryFn: getTvLatest,
  });
  return [airingToday, popular, topRated, latest];
}
