import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  align-self: center;
  height: 250px;
`;
const PingLoader = styled.div`
  align-self: center;
  width: 80px;
  height: 80px;
  margin: 5vh 0 5vh 0;
  padding: 0;
  border-radius: 50%;
  background: rgb(131, 197, 190);
  animation: ping 0.5s ease-in-out infinite;

  @keyframes ping {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;
const Loader = () => {
  return (
    <LoaderContainer>
      <PingLoader></PingLoader>
    </LoaderContainer>
  );
};

export default Loader;
