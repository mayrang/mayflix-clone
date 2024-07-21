import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

import useTvMultiQuery from "../hooks/useTvMultiQuery";
import TvShowSlider from "../components/TvShowSlider";
import TvShowLatest from "../components/TvShowLatest";
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

export default function Tv() {
  // const { data, isLoading } = useQuery<IGetMovieResult>({
  //   queryKey: ["movies", "airingToday"],
  //   queryFn: getMovies,
  // });

  const [
    { data: airingToday, isLoading: airingTodayLoading },
    { data: popular, isLoading: popularLoading },
    { data: topRated, isLoading: topRatedLoading },
    { data: latest, isLoading: latestLoading },
  ] = useTvMultiQuery();

  return (
    <Wrapper>
      {popularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(popular?.results[0].backdrop_path || "")}>
            <Title>{popular?.results[0].name}</Title>
            <Overview>
              {popular?.results[0].overview !== ""
                ? popular?.results[0].overview
                : `${popular?.results[0].name}'s Overview`}
            </Overview>
          </Banner>
          <SliderWrapper>
            {popular && <TvShowSlider title={"Popular"} data={popular} />}
            {!topRatedLoading && topRated && <TvShowSlider title={"Top Rated"} data={topRated} />}
            {!airingTodayLoading && airingToday && <TvShowSlider title={"Airing Today"} data={airingToday} />}
          </SliderWrapper>

          {!latestLoading && latest && <TvShowLatest data={latest} />}
        </>
      )}
    </Wrapper>
  );
}
