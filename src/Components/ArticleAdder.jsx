import React, { Component } from 'react';
import { navigate } from '@reach/router';
import Loader from './Loader';
import ErrorBox from './ErrorBox';
import * as API from '../API';
import styled from 'styled-components';

const AdderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  height: 30vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

class ArticleAdder extends Component {
  state = {
    topic: '',
    topics: [],
    title: '',
    body: '',
    error: {},
    hasError: false,
    isLoading: true,
  };

  componentDidMount() {
    const { linkedFrom } = this.props.location.state;
    API.getTopics().then((topics) => {
      this.setState({ topics: topics, topic: linkedFrom, isLoading: false });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, topic, body } = this.state;
    const submittedArticle = {
      title,
      topic,
      body,
      author: this.props.username,
    };
    API.postArticle(submittedArticle)
      .then((newArticle) => {
        navigate(`/articles/${newArticle.article_id}`);
      })
      .catch((err) => {
        const {
          response: {
            status,
            data: { msg },
          },
        } = err;
        this.setState({
          error: { status, msg },
          hasError: true,
          isLoading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { topics, title, body, isLoading, hasError, error } = this.state;
    const { linkedFrom } = this.props.location.state;
    const defaultTopic = linkedFrom ? linkedFrom : 'default';

    if (isLoading) {
      return <Loader />;
    }
    return (
      <AdderContainer>
        <h1>Post to {defaultTopic}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Topic
            <select
              value={this.state.topic}
              onChange={this.handleChange}
              name="topic"
              required
            >
              <option value="">Select Your Topic</option>
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Add a descriptive title..."
              value={title}
              onChange={this.handleChange}
              required
            ></input>
          </label>
          <label>
            Text
            <textarea
              placeholder="Write your post here..."
              name="body"
              value={body}
              onChange={this.handleChange}
              required
            ></textarea>
          </label>
          <button type="submit">POST</button>
        </form>
        {hasError ? <ErrorBox error={error} /> : null}
      </AdderContainer>
    );
  }
}

export default ArticleAdder;
