import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Contaner = styled.div`
  width: 100%;
  height: 400px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
  overflow: hidden;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg }) => (
  <Contaner>
    <Link to={`/${id}`}>
      <Poster bg={bg} />
    </Link>
  </Contaner>
);
