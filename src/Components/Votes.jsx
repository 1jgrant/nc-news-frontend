import React, { Component } from 'react';
import styled from 'styled-components';

const VotesContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`


class Votes extends Component {
    state = {
        votes: 0
    }
    render() {
        return (
            <VotesContainer>
                <button>⬆</button>
                <span>{this.props.votes}</span>
                <button>⬇</button>
            </VotesContainer>
        );
    }
}

export default Votes;