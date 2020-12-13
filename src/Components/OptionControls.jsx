import React, { Component } from 'react';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 5vw 0 0;
  input {
    max-width: 25px;
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
      <OptionsContainer>
        <form>
          <label>
            View
            <select name="limit" defaultValue={10} onChange={this.handleChange}>
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
              step={1}
              min={1}
              value={this.state.p}
              onChange={this.handleChange}
            ></input>
          </label>
        </form>
      </OptionsContainer>
    );
  }
}

export default OptionControls;
