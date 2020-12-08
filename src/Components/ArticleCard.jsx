import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';

const ArticleCardContainer = styled.div`
    display: flex;
    background: rgba(152, 154, 152, 0.479);
    padding: 1px;
    margin: 10px;
    width: 60vw;
    max-height: 200px;

    div{
        background: rgba(176, 178, 176, 0.764);
        margin: 5px;
    }
`
const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    .comments {
        color: rgba(16, 16, 93, 0.874);
        text-decoration: none;
        align-self: flex-end;
    }
`
const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4{
        margin: 0.3rem;
    }
`
const ArticleBody = styled.p`
    font-size: 0.8rem;
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
            <CardContent>
                <CardHeader>
                    <h4>{title}</h4>
                    <span>posted in {topic} by {author}</span>
                </CardHeader>
                <ArticleBody>
                    {body}
                </ArticleBody> 
                <Link className='comments' to='/'>{comment_count} comments</Link> 
            </CardContent>
            
        </ArticleCardContainer>
    );
};

export default ArticleCard;