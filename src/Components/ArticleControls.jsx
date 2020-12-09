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
        <Link
          className="link"
          to="top/"
          state={{ query: { sort_by: 'votes' } }}
        >
          Top
        </Link>
        <Link
          className="link"
          to="popular/"
          state={{ query: { sort_by: 'comment_count' } }}
        >
          Popular
        </Link>
        <Link
          className="sort"
          to="new/"
          state={{ query: { sort_by: 'created_at' } }}
        >
          New
        </Link>
      </ControlsContainer>
    );
  }
}

export default ArticleControls;
