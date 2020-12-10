import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 100%;
  h1 {
    padding: 0;
    margin: 0;
    font-size: 22rem;
    background: white;
  }
`;

const ErrorPage = (props) => {
  const { errorMessage, isValidPath } = props;
  console.log(props);
  let clientMessage = errorMessage;
  if (!isValidPath) {
    clientMessage = '404';
  }
  return (
    <ErrorContainer className="ErrorContainer">
      <h1>{clientMessage}</h1>
    </ErrorContainer>
  );
};

export default ErrorPage;
