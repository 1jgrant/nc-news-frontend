import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';

const ArticleCardContainer = styled.div`
    display: flex;
    background: rgba(152, 154, 152, 0.479);
    padding: 5px;
    margin: 10px;
    width: 50vw;
    height: 300px;

    div{
        background: rgba(176, 178, 176, 0.764);
        margin: 5px;
    }
`
const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    
`

const ArticleBody = styled.p`
    grid-column-start: 2;
    background: rgba(111, 111, 111, 0.435);
    display: block;
    width: 1fr;
    overflow: hidden;
    text-overflow: ellipsis;

`

const ArticleCard = (props) => {
    const {title,author,body,votes,topic,comment_count} = props.article
    return (
        <ArticleCardContainer>
            <Votes votes={votes}/>
            <CardHeader>
                <h4>{title}</h4>
                <h4>posted in {topic} by {author}</h4>
            </CardHeader>
            <ArticleBody>
                {body}
            </ArticleBody>
        </ArticleCardContainer>
    );
};

export default ArticleCard;