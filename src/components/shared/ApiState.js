import React from 'react';
import styled from "@emotion/styled";

const ApiState = ({ message }) => {
  return (
      <LoadingContainer>
        <Loader>{message}</Loader>
      </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  font-size: 32px;
  color: darkgray;
`;

export default ApiState;