import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useSearchMultiQuery from "../hooks/useSearchMultiQuery";
import MovieSlider from "../components/MovieSlider";
import TvShowSlider from "../components/TvShowSlider";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
  padding-top: 200px;
`;

const Title = styled.h2`
  font-size: 44px;
  padding: 0 48px;
  margin-bottom: 20px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: centerf;
`;

export default function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const navigate = useNavigate();
  const [{ data: searchMovie, isLoading: searchMovieLoading }, { data: searchTv, isLoading: searchTvLoading }] =
    useSearchMultiQuery(keyword);

  return (
    <Wrapper>
      {searchTvLoading || searchMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Title>{keyword}'s Search Result</Title>
          {searchMovie && <MovieSlider isSearch title="Movie" data={searchMovie} />}
          {searchTv && <TvShowSlider isSearch title="TV Show" data={searchTv} />}
        </>
      )}
    </Wrapper>
  );
}
