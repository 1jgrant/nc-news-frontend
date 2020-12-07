import React from 'react';
import Topics from './Topics'
import Users from './Users'

const Header = (props) => {
    const {topic, username} = props
    return (
        <div>
            <h1>NC News</h1>
            <Topics topic={topic}/>
            <Users username={username}/>
        </div>
    );
};

export default Header;