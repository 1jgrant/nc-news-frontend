import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import * as API from '../API';

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
      <div>
        <select onChange={this.handleTopicChange} value={currentTopic}>
          <label>TOPIC</label>
          <option key="all" value="">
            ALL
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Topics;
