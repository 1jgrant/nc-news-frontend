import React, { Component } from 'react';
import ArticleControls from './ArticleControls';
import ArticleCard from './ArticleCard';
import styled from 'styled-components';
import Loader from './Loader';
import * as API from '../API';

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Articles extends Component {
  state = {
    currentTopic: '',
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    //const query = this.props.location.state.query
    //console.log(query);
    API.getArticles(this.props.topic_name).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //const query = this.props.location.state.query;
    //console.log(query);
    //||
    //query !== prevProps.location.state.query
    if (this.props.topic_name !== prevProps.topic_name) {
      console.log('in logic');
      //console.log(query);
      API.getArticles(this.props.topic_name).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    if (this.state.isLoading)
      return (
        <ArticlesContainer>
          <Loader />
        </ArticlesContainer>
      );
    return (
      <ArticlesContainer>
        <ArticleControls />
        <main>
          {this.state.articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </main>
      </ArticlesContainer>
    );
  }
}

export default Articles;
