import React, { Component } from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  background: rgba(239, 153, 153, 0.531);
  margin: 0.5rem;
  padding: 1rem;

  .link {
    padding: 5px;
  }
`;

class OptionControls extends Component {
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
        <form onChange={this.handleChange}>
          <label>
            View
            <select name="limit" defaultValue={10}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={1000}>All</option>
            </select>
          </label>
          <label>
            Page
            <input
              type="number"
              name="p"
              defaultValue={1}
              step={1}
              min={1}
              value={this.state.p}
            ></input>
          </label>
        </form>
      </ControlsContainer>
    );
  }
}

export default OptionControls;
