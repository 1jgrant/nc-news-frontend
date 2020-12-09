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
  //   state={{ query: { sort_by: 'votes' } }}
  // state={{ query: { sort_by: 'comment_count' } }}
  // state={{ query: { sort_by: 'created_at' } }}
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
