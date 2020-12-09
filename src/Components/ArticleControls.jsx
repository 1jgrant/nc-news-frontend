import React, { Component } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  background: rgba(239, 153, 153, 0.531);
  margin: 0.5rem;
  padding: 1rem;

  .link {
    padding: 5px;
  }
`;

class ArticleControls extends Component {
  state = {
    sortBy: 'date',
    show: 10,
  };
  render() {
    return (
      <ControlsContainer>
        <Link to="top">Top</Link>
        <Link to="popular">Popular</Link>
        <Link to="new">New</Link>
      </ControlsContainer>
    );
  }
}

export default ArticleControls;
