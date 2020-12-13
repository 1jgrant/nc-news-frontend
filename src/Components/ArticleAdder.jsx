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
  width: 100vw;
  form {
    width: 50vw;
    min-width: 200px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    select {
      width: 100%;
    }
    input {
      width: 100%;
    }
    textarea {
      width: 100%;
      height: 3em;
    }
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
    if (isLoading) {
      return (
        <AdderContainer>
          <Loader />
        </AdderContainer>
      );
    }
    return (
      <AdderContainer>
        <h1>Add an article...</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Topic
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
