import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as API from '../../../API';
import styled from 'styled-components';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const TopicsSelect = styled.div`
  select {
    width: 60px;
  }
  .dropdown-toggle {
    font-size: 0.8em;
    background: rgb(0, 109, 119);
    border: none;
  }
`;

class Topics extends Component {
  state = {
    currentTopic: 'all',
    topics: [],
  };

  componentDidMount() {
    API.getTopics().then((topics) => {
      this.setState({ topics: topics });
    });
  }
  componentDidUpdate() {
    if (this.props.topic !== this.state.currentTopic) {
      this.setState({ currentTopic: this.props.topic });
    }
  }

  handleTopicClick = (event) => {
    const targetTopic = event.target.value;
    this.setState({ currentTopic: targetTopic }, () => {
      this.props.updateTopic(this.state.currentTopic);
    });
    const path =
      targetTopic === 'all' ? '/' : `/articles/topics/${targetTopic}`;
    navigate(path);
  };

  render() {
    const { topics, currentTopic } = this.state;
    return (
      <TopicsSelect>
        <DropdownButton
          id="topics-dropdown"
          size="sm"
          variant="info"
          title={currentTopic.toUpperCase()}
        >
          <Dropdown.ItemText>Select a topic:</Dropdown.ItemText>
          <Dropdown.Item
            as="button"
            onClick={this.handleTopicClick}
            key="all"
            value="all"
          >
            ALL
          </Dropdown.Item>
          {topics.map((topic) => {
            return (
              <Dropdown.Item
                as="button"
                key={topic.slug}
                value={topic.slug}
                onClick={this.handleTopicClick}
              >
                {topic.slug.toUpperCase()}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </TopicsSelect>
    );
  }
}

export default Topics;
