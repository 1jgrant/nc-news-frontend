import React, { Component } from 'react';
import { navigate } from '@reach/router';
import Loader from '../../Loader';
import ErrorBox from '../Errors/ErrorBox';
import * as API from '../../../API';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  form {
    width: 60vw;
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
  h1 {
    margin: 1em 0 1em 0;
    font-size: 2em;
  }
  button {
    background: rgb(0, 109, 119);
    border: 2px solid rgb(0, 109, 119);
    margin: 1em 0 0 0;
  }
  textarea {
    min-height: 6em;
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Topic:</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a descriptive title..."
              name="title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Article Body:</Form.Label>
            <Form.Control
              as="textarea"
              bsPrefix="textarea"
              placeholder="Write your post here..."
              name="body"
              value={body}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Button variant="info" type="submit" block>
            POST
          </Button>
        </Form>
        {hasError ? <ErrorBox error={error} /> : null}
      </AdderContainer>
    );
  }
}

export default ArticleAdder;
