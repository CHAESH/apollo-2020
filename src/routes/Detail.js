import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovies($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_full
    }
  }
`;

const Container = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });

  return (
    <Container>
      <Column>
        <Title>Name</Title>
        <Subtitle>English 4.5</Subtitle>
        <Description>aledfeis jslkifej </Description>
      </Column>
      {!loading && <Poster></Poster>}
    </Container>
  );
};
