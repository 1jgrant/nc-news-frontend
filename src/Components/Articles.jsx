import React, { Component } from 'react';
import ArticleControls from './ArticleControls';
import ArticleCard from './ArticleCard';
import styled from 'styled-components';
import Loader from './Loader';
import * as API from '../API'

const ArticlesContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    
`

class Articles extends Component {
    state = {
        currentTopic: '',
        articles: [],
        isLoading: true
    }

    componentDidMount() {
        API.getArticles().then(articles => {
            this.setState({articles: articles, isLoading: false})
        })
    }

    render() {
        if (this.state.isLoading) return <Loader/>
        return (
            <ArticlesContainer>
                <ArticleControls/>
                <main>
                    {this.state.articles.map(article => {
                        return <ArticleCard key={article.article_id} article={article}/>
                    })}
                </main>
            </ArticlesContainer>
        );
    }
}

export default Articles;