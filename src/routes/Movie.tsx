import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieBox = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  left: 0;
  right: 0;
  transform: translateY(-50%) !important;
  top: 50%;
  margin: 0 auto;
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

const Wrapper = styled.div`
  position: relative;
  top: -80px;
`;

const Overview = styled.p`
  padding: 20px;

  color: ${(props) => props.theme.white.lighter};
`;

export default function Movie() {
  const { layoutId, previewInfo } = useOutletContext<{ layoutId: string; previewInfo: IMovie | undefined }>();
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onGoBack} />
      <MovieBox layoutId={layoutId}>
        <Cover
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
              previewInfo?.backdrop_path || "",
              "w500"
            )})`,
          }}
        />
        <Wrapper>
          <Title>{previewInfo?.title}</Title>
          <Overview>{previewInfo?.overview}</Overview>
        </Wrapper>
      </MovieBox>
    </>
  );
}
