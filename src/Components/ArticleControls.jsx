import React, { Component } from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
    background: rgba(239, 153, 153, 0.531);
    margin: 0.5rem;
    padding: 1rem;
`


class ArticleControls extends Component {
    state = {
        sortBy: 'date',
        show: 10
    }
    render() {
        return (
            <ControlsContainer>
                <form>
                    <label>
                        Filter By
                        <select>
                            <option>Choose</option>
                            <option>Author</option>
                            <option>Topic</option>
                            <option>Choose</option>
                        </select>
                    </label>
                    <label>
                        Sort By
                        <select>
                            <option>Choose</option>
                            <option>Author</option>
                            <option>Topic</option>
                            <option>Choose</option>
                        </select>
                    </label>
                </form>
            </ControlsContainer>
        );
    }
}

export default ArticleControls;