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
  const clientMessage = isValidPath
    ? { status, msg }
    : { status: 404, msg: 'Invalid url' };
  return (
    <ErrorContainer className="ErrorContainer">
      <h1>{clientMessage.status}</h1>
      <h2>{clientMessage.msg}</h2>
    </ErrorContainer>
  );
};

export default ErrorPage;
