import React from 'react';

const ErrorBox = (props) => {
  const {
    error: { status, msg },
    isInvalidPath,
  } = props;
  const clientMessage = isInvalidPath
    ? { status: 404, msg: 'Invalid url' }
    : { status, msg };
  return (
    <div>
      <h1>{clientMessage.status}</h1>
      <h2>{clientMessage.msg}</h2>
    </div>
  );
};

export default ErrorBox;
