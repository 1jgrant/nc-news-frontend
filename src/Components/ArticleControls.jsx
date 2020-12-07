import React, { Component } from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
    background: rgba(239, 153, 153, 0.531);
`


class ArticleControls extends Component {
    state = {
        sortBy: 'date',
        show: 10
    }
    render() {
        return (
            <ControlsContainer>
                <h1>Controls</h1>
            </ControlsContainer>
        );
    }
}

export default ArticleControls;