import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 50vh;
  min-height: 200px;
  color: rgb(0, 109, 119);

  .wrapper {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h1 {
      padding: 0;
      margin: 0 0 0 1rem;
      font-size: 10em;
    }
    h2 {
      padding: 0;
      margin: 0 0 0 1rem;
    }
    @media only screen and (min-width: 768px) {
      margin-left: 0rem;
      width: 800px;
    }
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
      <div className="wrapper">
        <h1>{clientMessage.status}</h1>
        <h2>{clientMessage.msg}</h2>
      </div>
    </ErrorContainer>
  );
};

export default ErrorPage;
