import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as API from '../API';

class Topics extends Component {
  state = {
    topic: '',
    topics: [],
  };

  componentDidMount() {
    API.getTopics().then((topics) => {
      this.setState({ topics: topics });
    });
  }

  render() {
    const { topics } = this.state;
    return (
      <div>
        <Link to="/">All</Link>
        {topics.map((topic) => {
          return (
            <Link key={topic.slug} to={`/topics/${topic.slug}`}>
              {topic.slug}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Topics;
