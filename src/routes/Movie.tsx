import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IMovie, IMovieDetail } from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 999;
`;

const PlayButton = styled.button`
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.darker};
  border: none;
  cursor: pointer;
  padding: 7px 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  font-size: 14px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const InfoButton = styled.button`
  background-color: rgba(153, 151, 151, 0.3);
  color: ${(props) => props.theme.white.darker};
  border: none;
  cursor: pointer;
  padding: 6px 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  font-size: 14px;
  svg {
    fill: ${(props) => props.theme.white.darker};
    width: 18px;
    height: 18px;
  }
`;

const MovieBox = styled(motion.div)`
  position: fixed;
  width: 40vw;
  z-index: 1000;
  background-color: ${(props) => props.theme.black.lighter};
  left: 0;
  right: 0;
  transform: translateY(-50%) !important;
  top: 50%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
`;

const Date = styled.div`
  font-size: 18px;
  padding: 0px 20px 0px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 15px 20px;
`;

const Genre = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px 20px;
  span {
    font-size: 15px;
    color: #5da0d6;
  }
`;

const Overview = styled.p`
  padding: 15px 15px 30px 15px;

  color: ${(props) => props.theme.white.lighter};
`;

export default function Movie() {
  const { layoutId, previewInfo } = useOutletContext<{ layoutId: string; previewInfo: IMovie | undefined }>();
  const { data, isLoading } = useQuery<IMovieDetail>({
    queryKey: ["movies", "detail", layoutId],
    queryFn: () => getMovieDetail(+layoutId),
  });

  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const [searchParams] = useSearchParams();

  return (
    <>
      <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onGoBack} />
      <MovieBox layoutId={`${searchParams.get("category") || "Now Playing"}-${layoutId}`}>
        <Cover
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
              data?.backdrop_path || previewInfo?.backdrop_path || "",
              "w500"
            )})`,
          }}
        />
        <Wrapper>
          <Title>{data?.title || previewInfo?.title}</Title>
          <Date>{data?.release_date}</Date>
          <Genre>
            {data?.genres.map((genre) => (
              <span>#{genre.name}</span>
            ))}
          </Genre>
          <Flex>
            <PlayButton>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
              </svg>
              <div>Play</div>
            </PlayButton>
            <InfoButton>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
              <div>Detail</div>
            </InfoButton>
          </Flex>
          <Overview>{data?.overview || previewInfo?.overview}</Overview>
        </Wrapper>
      </MovieBox>
    </>
  );
}
