import React from "react";
import styled from "styled-components";
import { IMovie } from "./../api";
const Wrapper = styled.div`
  padding: 20px;
  position: relative;
  top: -100px;
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;
`;

const Image = styled.div`
  background-position: center center;
  background-size: cover;
  width: 260px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${(props) => props.theme.white.darker};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  padding: 10px 0;
`;

const SubTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  padding: 10px 0;
`;

const Overview = styled.div`
  font-size: 18px;
  width: 80%;
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

const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px 0;
`;

export default function Latest({ data }: { data: IMovie }) {
  return (
    <Wrapper>
      <Title>Latest</Title>
      <FlexWrapper>
        <Image
          style={{
            backgroundImage: `${data.backdrop_path || ""}`,
            backgroundColor: data.backdrop_path ? "none" : "#969393",
          }}
        >
          {!data.backdrop_path && <div>{data.title} don't have poster</div>}
        </Image>
        <Content>
          <SubTitle>{data.title}</SubTitle>
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
          <Overview>{data.overview}</Overview>
        </Content>
      </FlexWrapper>
    </Wrapper>
  );
}
