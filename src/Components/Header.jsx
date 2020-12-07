import React from 'react';
import Topics from './Topics';
import Users from './Users';
import styled from 'styled-components';
import {Link} from '@reach/router'

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: rgba(128, 128, 128, 0.442);
    h1{
      color: #000000;  
    }
`

const Header = (props) => {
    const {topic, username} = props
    return (
        <HeaderContainer>
            <Link to='/'>
            <h1>NC News</h1>
            </Link>
            <Topics topic={topic}/>
            <Users username={username}/>
        </HeaderContainer>
    );
};

export default Header;