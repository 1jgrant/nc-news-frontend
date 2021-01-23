import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as API from '../../../API';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const TopicsSelect = styled.div`
  select {
    width: 60px;
  }
`;

class Topics extends Component {
  state = {
    currentTopic: '',
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

  handleTopicChange = (event) => {
    const targetTopic = event.target.value;
    this.setState({ currentTopic: targetTopic }, () => {
      this.props.updateTopic(this.state.currentTopic);
    });
    const path = targetTopic === '' ? '/' : `/articles/topics/${targetTopic}`;
    navigate(path);
  };

  render() {
    const { topics, currentTopic } = this.state;
    return (
      <TopicsSelect>
        <Form.Control as='select' size='sm' onChange={this.handleTopicChange} value={currentTopic}>
          <option key="all" value={''}>
            ALL
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug.toUpperCase()}
              </option>
            );
          })}
        </Form.Control>
      </TopicsSelect>
    );
  }
}

export default Topics;
