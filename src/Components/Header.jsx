import React from 'react';
import Topics from './Topics';
import Users from './Users';
import styled from 'styled-components';
import { Link } from '@reach/router';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.442);
  height: 5vh;
  width: 100vw;
  margin: 0;
  h1 {
    padding: 5px;
    margin: 5px;
    color: #000000;
    align-self: flex-start;
  }
`;

const Header = (props) => {
  const { topic, username } = props;
  return (
    <HeaderContainer>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <Topics topic={topic} />
      <Users username={username} />
    </HeaderContainer>
  );
};

export default Header;
