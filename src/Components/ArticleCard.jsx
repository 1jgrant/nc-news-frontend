import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';

const ArticleCardContainer = styled.div`
    display: grid;
    grid-template-columns: 15% 1fr;
    grid-template-rows: 1fr 4fr;
    background: rgba(173, 215, 173, 0.479);
    padding: 5px;
    margin: 10px;
    width: 50vw;
    height: 300px;

    div{
        background: rgba(173, 215, 173, 0.764);
        margin: 5px;
    }
`
const CardHeader = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
`

const ArticleBody = styled.p`
    grid-column-start: 2;
    background: red;
`

const ArticleCard = (props) => {
    console.log(props)
    const {title,author} = props.article
    return (
        <ArticleCardContainer>
            <Votes />
            <CardHeader>
                <h4>{title}</h4>
                <p>posted by {author}</p>
                <p>posted in</p>
            </CardHeader>
            <ArticleBody>

            </ArticleBody>
        </ArticleCardContainer>
    );
};

export default ArticleCard;