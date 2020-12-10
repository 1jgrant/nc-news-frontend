import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  h1 {
    padding: 0;
    margin: 0;
    font-size: 18rem;
    background: white;
  }
  h2 {
    padding: 0;
    margin: 0;
  }
`;

const ErrorPage = (props) => {
  const {
    error: { status, msg },
    isValidPath,
  } = props;
  console.log(props);
  let clientMessage = msg;
  if (!isValidPath) {
    clientMessage = '404';
  }
  return (
    <ErrorContainer className="ErrorContainer">
      <h1>{status}</h1>
      <h2>{clientMessage}</h2>
    </ErrorContainer>
  );
};

export default ErrorPage;
