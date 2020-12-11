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
    console.log('topics props>>', this.props);
    console.log('topics state>>', this.state);
    const { topics, currentTopic } = this.state;
    return (
      <div>
        {/* <span>TOPIC</span> */}
        <select onChange={this.handleTopicChange} value={currentTopic}>
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
        </select>
      </div>
    );
  }
}

export default Topics;
