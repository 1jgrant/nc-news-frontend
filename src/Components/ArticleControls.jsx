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
    limit: 10,
    p: 1,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.props.handlePageOptions({ [name]: value });
  };

  render() {
    return (
      <ControlsContainer>
        <Link to="top">Top</Link>
        <Link to="popular">Popular</Link>
        <Link to="new">New</Link>
        <form onChange={this.handleChange}>
          <label>
            View
            <select defaultValue={10} name="limit">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={1000}>All</option>
            </select>
          </label>
        </form>
      </ControlsContainer>
    );
  }
}

export default ArticleControls;
