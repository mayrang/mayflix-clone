import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMovies, IGetMovieResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import useWindowDimensions from "../hooks/useWindowDemesion";
import { Outlet, PathMatch, useMatch, useNavigate } from "react-router-dom";

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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  height: 200px;
  color: red;
  cursor: pointer;
  font-size: 36px;
  width: 100%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  background-color: white;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  top: 100%;
  transform: translateY(-100%);
  position: relative;
  opacity: 0;
  bottom: 0;
  width: 100%;
  h4 {
    font-size: 14px;

    text-align: center;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

export default function Home() {
  const movieIdMatch: PathMatch<string> | null = useMatch("/movie/:movieId");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<IGetMovieResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  const window = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const onIncreaseIndex = () => {
    if (data) {
      if (leaving) return;
      // 첫 영화를 빼야하므로
      const totalLength = data.results.length - 1;
      // 인덱스는 0부터 시작하므로
      const maxIndex = Math.floor(totalLength / offset) - 1;
      toggleLeave();
      setIndex((prev) => (maxIndex === prev ? 0 : prev + 1));
    }
  };
  const toggleLeave = () => setLeaving((prev) => !prev);
  const onClickBox = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  console.log(data?.results.find((item) => item.id === +(movieIdMatch?.params.movieId as string)));
  return (
    <Wrapper style={{ height: "200vh" }}>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner onClick={onIncreaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeave}>
              <Row
                transition={{ duration: 1, type: "tween" }}
                initial={{
                  x: window,
                }}
                animate={{ x: 0 }}
                exit={{ x: -window }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      onClick={() => onClickBox(movie.id)}
                      variants={boxVariants}
                      layoutId={movie.id + ""}
                      transition={{ type: "tween" }}
                      initial="normal"
                      whileHover="hover"
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      key={movie.id}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
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
