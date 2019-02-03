/**
 * Author: Ruo
 * Create: 2018-01-05
 * Description: article card
 */

import React from 'react';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';
import {Card, Button} from 'DFComponents/uis';
import draftToHtml from 'draftjs-to-html';

const ArticleCardWrapper = styled(Card)`
    padding: 0;
    margin: 0px 0px 50px;
`;
const Header = styled.header`
    //margin: -10px -10px 10px -10px;
    padding: 10px;
    font-size: ${rem(26)};
    text-transform: uppercase;
    //background-color: ${theme.colors.black};
    //color: ${theme.colors.white};
    ${theme.textOverflow()};
    position: relative;
    //&::before {
    //    content: '';
    //    display: block;
    //    position: absolute;
    //    right: 1px;
    //    bottom: 2px;
    //    box-shadow: 0px 0px 0px 1px #fff, 0px -3px 0px 1px #fff, -3px 0px 0px 1px #fff;
    //}
    //&::after {
    //    content: '';
    //    display: block;
    //    position: absolute;
    //    left: 1px;
    //    bottom: 2px;
    //    box-shadow: 0px 0px 0px 1px #fff, 0px -3px 0px 1px #fff, 3px 0px 0px 1px #fff;
    //}
`;
const InfoBox = styled.div`
    //position: absolute;
    //top: -20px;
    //left: -4px;
    //height: 20px;
    //color: ${theme.colors.white};
`;
const PublishTime = styled.span`
    display: inline-block;
    margin-right: 1px;
    padding: 0 10px;
    //background-color: ${theme.colors.black};
`;

const Author = styled.span`
    display: inline-block;
    padding: 0 10px;
    //background-color: ${theme.colors.black};
`;
const Summary = styled.div`
    padding: 10px;
    ${theme.fontFamily('Roboto')};
    p {
      ${theme.marginTrim({direction: 'v'})};
    }
`;

const Readmore = styled(Button)`
    height: 26px;
    position: absolute;
    right: -4px;
    bottom: -26px;
    font-size: 16px;
`;
const TagBox = styled.div`
    position: absolute;
    bottom: -20px;
    right: 85px;
    height: 20px;
    color: rgb(255,255,255);
`;
const Tag = styled.span`
    display: inline-block;
    margin-left: 1px;
    background-color: rgb(0, 4, 26);
    padding: 0px 10px;
`;

@inject('ArticlePageStore') @observer
export class ArticlePage extends React.Component {

    componentDidMount() {
        const articleId = this.props.match.params.articleId;
        if (articleId) {
            this.props.ArticlePageStore.getArticle(articleId);
        } else {

        }
    }

    render() {
        const {ArticlePageStore} = this.props;
        const {article} = ArticlePageStore;
        const {title, publishDate, author, tags, content} = article;
        const html = draftToHtml(content);
        return (
            !!article.id && <ArticleCardWrapper>
                <Header><Readmore>Back</Readmore>{title}</Header>
                <InfoBox>
                    <PublishTime>{publishDate}</PublishTime>
                    <Author>{author.username}</Author>
                </InfoBox>
                <TagBox>{tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</TagBox>
                <Summary dangerouslySetInnerHTML={{__html: html}}/>
            </ArticleCardWrapper>
        );
    }
}
