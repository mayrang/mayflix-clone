import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDemesion";

import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetTvShowResult } from "../api";

const SliderWrapper = styled(motion.div)`
  position: relative;
  margin: 50px 0;
  height: 250px;
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

const RowWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
`;

const Title = styled.div`
  padding: 8px 4px;
  h2 {
    font-size: 28px;
    line-height: 30px;
    font-weight: bold;
  }
`;

const buttonVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};

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

const Button = styled(motion.button)<{ arrow: "right" | "left" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.arrow === "left" ? "20px" : "none")};
  right: ${(props) => (props.arrow === "right" ? "20px" : "none")};
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  width: 80px;
  opacity: 0;
  height: 80px;
  border-radius: 40px;
  cursor: pointer;
  z-index: 99;
  svg {
    fill: ${(props) => props.theme.white.lighter};
    width: 40px;
    height: 60px;
  }
  font-weight: bold;
`;

const offset = 6;

export default function TvShowSlider({
  title,
  data,
  isSearch = false,
}: {
  title: string;
  data: IGetTvShowResult;
  isSearch?: boolean;
}) {
  const window = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [moving, setMoving] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const tvShowIdMatch = useMatch("/tv/:tvShowId");
  useEffect(() => {
    if (moving) {
      // 첫 영화를 빼야하므로
      const totalLength = data.results.length - 1;
      // 인덱스는 0부터 시작하므로
      const maxIndex = Math.floor(totalLength / offset) - 1;
      setIndex((prev) => (back ? (prev === 0 ? maxIndex : prev - 1) : prev === maxIndex ? 0 : prev + 1));
      setMoving(false);
    }
  }, [back, moving, data.results.length]);
  const onIncreaseIndex = async () => {
    if (data) {
      if (leaving) return;
      toggleLeave();
      setBack(false);
      setMoving(true);
    }
  };
  const onDecreaseIndex = async () => {
    if (data) {
      if (leaving) return;

      toggleLeave();
      setBack(true);
      setMoving(true);
    }
  };
  const toggleLeave = () => setLeaving((prev) => !prev);
  const onClickBox = (tvShowId: number) => {
    if (isSearch) {
      return;
    } else {
      navigate(`tv/${tvShowId}?category=${title}`);
    }
  };
  return (
    <SliderWrapper initial="normal" whileHover="hover">
      <Title>
        <h2>{title}</h2>
      </Title>
      <RowWrapper>
        {!tvShowIdMatch && (
          <Button onClick={onDecreaseIndex} variants={buttonVariants} arrow={"left"}>
            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </motion.svg>
          </Button>
        )}

        <AnimatePresence initial={false} onExitComplete={toggleLeave}>
          <Row
            transition={{ duration: 1, type: "tween" }}
            initial={{
              x: back ? -window : window,
            }}
            animate={{ x: 0 }}
            exit={{ x: back ? window : -window }}
            key={`${title}-${index}`}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tvShow) => (
                <Box
                  onClick={() => onClickBox(tvShow.id)}
                  variants={boxVariants}
                  layoutId={`${title}-${tvShow.id}`}
                  transition={{ type: "tween" }}
                  initial="normal"
                  whileHover="hover"
                  bgPhoto={makeImagePath(tvShow.backdrop_path, "w500")}
                  key={`${title}-${tvShow.id}`}
                >
                  <Info variants={infoVariants}>
                    <h4>{tvShow.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>

        {!tvShowIdMatch && (
          <Button onClick={onIncreaseIndex} variants={buttonVariants} arrow={"right"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </Button>
        )}
      </RowWrapper>
      <AnimatePresence>
        {tvShowIdMatch ? (
          <Outlet
            context={{
              layoutId: tvShowIdMatch?.params.tvShowId as string,
              previewInfo: data?.results.find((item) => item.id === +(tvShowIdMatch?.params.tvShowId as string)),
            }}
          />
        ) : null}
      </AnimatePresence>
    </SliderWrapper>
  );
}
