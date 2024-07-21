import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

import MovieSlider from "../components/MovieSlider";
import useMovieMultipleQuery from "../hooks/useMovieMultipleQuery";
import Latest from "../components/Latest";
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

const SliderWrapper = styled(motion.div)`
  position: relative;
  top: -170px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

export default function Home() {
  const [
    { data: nowPlaying, isLoading: nowPlayingLoading },
    { data: latest, isLoading: latestLoading },
    { data: topRated, isLoading: topRatedLoading },
    { data: upcoming, isLoading: upcomingLoading },
  ] = useMovieMultipleQuery();

  return (
    <Wrapper>
      {nowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}>
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            {nowPlaying && <MovieSlider title={"Now Playing"} data={nowPlaying} />}
            {!topRatedLoading && topRated && <MovieSlider title={"Top Rated"} data={topRated} />}
            {!upcomingLoading && upcoming && <MovieSlider title={"Upcoming"} data={upcoming} />}
          </SliderWrapper>

          {!latestLoading && latest && <Latest data={latest} />}
        </>
      )}
    </Wrapper>
  );
}
