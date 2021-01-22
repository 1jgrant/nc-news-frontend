import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 50vh;
  color: rgb(0, 109, 119);
  h1 {
    padding: 0;
    margin: 0 0 0 5vw;
    font-size: 10em;
  }
  h2 {
    padding: 0;
    margin: 0 0 0 5vw;
  }
`;

const ErrorPage = (props) => {
  const {
    error: { status, msg },
    isInvalidPath,
  } = props;
  const clientMessage = isInvalidPath
    ? { status: 404, msg: 'Invalid url' }
    : { status, msg };
  return (
    <ErrorContainer className="ErrorContainer">
      <h1>{clientMessage.status}</h1>
      <h2>{clientMessage.msg}</h2>
    </ErrorContainer>
  );
};

export default ErrorPage;
