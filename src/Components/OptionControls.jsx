import React, { Component } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const OptionsContainer = styled(Form)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 5vw 0 0;
  margin: 0;
  .form-group {
    display: flex;
    align-items: center;
    padding: 0 0 0 2vw;
    margin: 0;
  }
  .form-control {
    margin: 0;
    padding: 0;
  }
  .form-label {
    margin: 0 1vw 0 0;
  }
  .dropdown {
    margin: 0 1em 0 0;
  }
  .dropdown-toggle {
    font-size: 0.8em;
    background: rgb(0, 109, 119);
    border: none;
  }
`;

class OptionControls extends Component {
  state = {
    limit: 10,
    p: 1,
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'limit' && Number(value) === 1000) {
      this.setState({ [name]: Number(value), p: 1 });
      this.props.handlePageOptions({ [name]: Number(value), p: 1 });
    } else {
      this.setState({ [name]: Number(value) });
      this.props.handlePageOptions({ [name]: Number(value) });
    }
  };

  render() {
    const { totalArticles } = this.props;
    const { limit, p } = this.state;
    const limitOptions = [
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 'All', value: 1000 },
    ];
    const maxPage = Math.ceil(totalArticles / limit);
    const pages = Array.from({ length: maxPage - 1 }, (v, i) => i + 2);
    return (
      <OptionsContainer>
        <Form.Group>
          <Form.Label>View</Form.Label>
          <DropdownButton
            id="user-dropdown"
            variant="info"
            title={limit === 1000 ? 'All' : limit}
          >
            {limitOptions.map((option) => {
              return (
                <Dropdown.Item
                  as="button"
                  key={option.label}
                  value={option.value}
                  name="limit"
                  onClick={this.handleChange}
                >
                  {option.label}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Form.Group>
        <Form.Group>
          <Form.Label>Page</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="p"
            value={this.state.p}
            onChange={this.handleChange}
          >
            <option key={1} value={1}>
              {1}
            </option>
            {pages.map((page) => {
              return (
                <option key={page} value={page}>
                  {page}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </OptionsContainer>
    );
  }
}

export default OptionControls;
