import React, { Component } from 'react';
import styled from 'styled-components';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 0.7rem 0 0;
  margin: 0;

  div {
    display: flex;
    align-items: center;
  }
  span {
    margin: 0 0.3em 0 0;
  }
  .dropdown {
    margin: 0 0.5em 0 0;
  }
  .dropdown-toggle {
    font-size: 0.8em;
    color: rgb(0, 109, 119);
    border: 1px solid rgb(0, 109, 119);
    :hover {
      background-color: rgb(0, 109, 119);
      color: #fff;
    }
  }
  .dropdown-item {
    :active {
      background-color: rgb(237, 246, 249);
      color: rgb(0, 109, 119);
    }
  }
`;

class OptionControls extends Component {
  state = {
    limit: 10,
    p: 1,
  };

  componentDidMount() {
    this.setState({ p: this.props.currentPage });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.props;
    const { p } = this.state;
    if (currentPage !== p) {
      this.setState({ p: this.props.currentPage });
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { totalArticles } = this.props;
    const { p } = this.state;
    if (name === 'limit') {
      // if new limit makes current page greater than max, update to be in bounds
      const newMaxPage = Math.ceil(totalArticles / Number(value));
      const newPage = p > newMaxPage ? newMaxPage : p;
      this.setState({ [name]: Number(value), p: newPage });
      this.props.handlePageOptions({ [name]: Number(value), p: newPage });
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
        <div>
          <span>View</span>
          <DropdownButton
            id="view-dropdown"
            variant="outline-info"
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
        </div>
        <div>
          <span>Page</span>
          <DropdownButton id="page-dropdown" variant="outline-info" title={p}>
            <Dropdown.Item
              as="button"
              name="p"
              key={1}
              value={1}
              onClick={this.handleChange}
            >
              1
            </Dropdown.Item>
            {pages.map((page) => {
              return (
                <Dropdown.Item
                  as="button"
                  name="p"
                  key={page}
                  value={page}
                  onClick={this.handleChange}
                >
                  {page}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </OptionsContainer>
    );
  }
}

export default OptionControls;
