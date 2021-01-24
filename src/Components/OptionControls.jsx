import React, { Component } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

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
`;

class OptionControls extends Component {
  state = {
    limit: 10,
    p: 1,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
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
    const { limit } = this.state;
    const maxPage = Math.ceil(totalArticles / limit);
    const pages = Array.from({ length: maxPage - 1 }, (v, i) => i + 2);
    return (
      <OptionsContainer>
        <Form.Group>
          <Form.Label>View</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="limit"
            defaultValue={10}
            onChange={this.handleChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={1000}>All</option>
          </Form.Control>
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
