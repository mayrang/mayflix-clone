import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMovies, IGetMovieResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import useWindowDimensions from "../hooks/useWindowDemesion";
import { Outlet, PathMatch, useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: centerf;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

export default function Home() {
  const movieIdMatch: PathMatch<string> | null = useMatch("/movie/:movieId");

  const { data, isLoading } = useQuery<IGetMovieResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

  console.log(data?.results.find((item) => item.id === +(movieIdMatch?.params.movieId as string)));
  return (
    <Wrapper style={{ height: "200vh" }}>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {data && <Slider title={"Now Playing"} data={data} />}
          <AnimatePresence>
            {movieIdMatch ? (
              <Outlet
                context={{
                  layoutId: movieIdMatch?.params.movieId as string,
                  previewInfo: data?.results.find((item) => item.id === +(movieIdMatch?.params.movieId as string)),
                }}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
