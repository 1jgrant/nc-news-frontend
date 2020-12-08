import React, { Component } from 'react';
import styled from 'styled-components';
import Votes from './Votes';
import Comments from './Comments';
import * as API from '../API';
import Loader from './Loader';

const ArticleContainer = styled.div`
  display: flex;
  background: rgba(219, 217, 217, 0.661);
  padding: 10px;
  width: 60vw;
`;

const ArticleHeader = styled.div`
  background: rgba(191, 191, 191, 0.922);
  h1 {
    margin-bottom: 0rem;
  }
`;

const ArticleContent = styled.div`
  background-color: rgba(147, 145, 145, 0.565);
  padding-left: 1rem;
  padding-right: 3rem;
`;

const ArticleBody = styled.p`
  background-color: rgba(191, 191, 191, 0.922);
`;

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
  };

  componentDidMount() {
    API.getArticle(this.props.article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { title, body, votes, topic, author } = this.state.article;
    if (this.state.isLoading)
      return (
        <ArticleContainer>
          <Loader />
        </ArticleContainer>
      );
    return (
      <>
        <ArticleContainer>
          <Votes votes={votes} />
          <ArticleContent>
            <ArticleHeader>
              <h1>{title}</h1>
              <span>
                posted in {topic} by {author} xtime ago
              </span>
            </ArticleHeader>
            <ArticleBody>{body}</ArticleBody>
          </ArticleContent>
        </ArticleContainer>
        <Comments />
      </>
    );
  }
}

export default SingleArticle;
