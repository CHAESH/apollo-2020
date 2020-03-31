import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import SuggestMovie from "../components/SuggestMovie";

const GET_MOVIE = gql`
  query getMovies($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_full
      isLiked @client
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 100vh;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60vh;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 55px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 25px;
`;

const Poster = styled.div`
  width: 20%;
  height: 70%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggest = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  height: 35vh;
  width: 80%;
  position: relative;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });
  console.log(data);
  return (
    <Container>
      <Row>
        <Column>
          <Title>
            {loading
              ? "Loading..."
              : `${data.movie.title} ${data.movie.isLiked ? "💖" : "💔"}`}
          </Title>
          {!loading ? (
            <>
              <Subtitle>
                {data?.movie?.language} · {data?.movie?.rating}
              </Subtitle>
              <Description>{data?.movie?.description_full}</Description>
            </>
          ) : (
            ""
          )}
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Row>
      <Suggest>
        {data?.suggestions?.map(s => (
          <SuggestMovie
            key={s.id}
            id={s.id}
            bg={s.medium_cover_image}
            title={s.title}
          />
        ))}
      </Suggest>
    </Container>
  );
};
