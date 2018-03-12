/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description: 入口页面组件名必须为Index
 */
import _ from 'lodash';
import React from 'react';
import {observable, action, autorun, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {Sidebar, SignUpMob, LoginMob, WriteMob, ArticleCard} from 'DFComponents';
import {Body, Model} from 'DFUIs';
import {theme, rem} from 'DFStyles';
import Reboot from 'material-ui/Reboot';
import {Header} from 'DFComponents';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Button from 'material-ui/Button';
import draftToHtml from 'draftjs-to-html';

// import Cookies from 'js-cookie';

const HomeWrapper = styled.div`
    margin: 0 auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    ${theme.hideScrollbar};
    &.fix {
        overflow: hidden;
    }
`;
/*const LogBox = styled.div`
    position: absolute;
    top: 0;
    right: 4px;
    ${theme.fontFamily()}
    & > button {
        margin-right: 1px;
        width: 100px;
        height: 30px;
        font-size: 12px;
        vertical-align: top;
    }
`;
const Logo = styled.span`
    display: inline-block;
    height: ${rem(theme.logoHeight)};
    line-height: ${rem(theme.logoHeight)};
    margin-borrom: 5px;
    padding: 0 10px;
    background-color: ${theme.colors.red};
    ${theme.fontFamily()};
    font-size: 20px;
    user-select: none;
    cursor: pointer;
    a {
      color: #fff;
    }
`;*/

@inject('UserStore', 'BlogStore')
@observer
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    @observable mobStatus = null;
    componentWillMount() {
        const {BlogStore} = this.props;
        BlogStore.getArticleListByPublished();
    }

    render() {
        const {BlogStore} = this.props;
        const articles = toJS(BlogStore.articleList);
        return (
            <HomeWrapper className={this.mobStatus ? 'fix' : null}>
                <Reboot key="reboot-style"/>
                <Header/>
                <Body>
                {_.map(articles, (v,k) => {
                    console.log(v, k);
                    const publishDate = new Date(v.publishDate);
                    return (
                        <Card key={k} style={{marginBottom: 20}}>
                            <CardHeader
                                title={v.title}
                                subheader={`${publishDate.toLocaleDateString()} - ${v.author.username} - tags: ${v.tags.join(' + ')}`}
                            />
                            <CardContent style={{padding: 0, margin: 16}}>
                                <div dangerouslySetInnerHTML={{__html: draftToHtml(v.content)}}/>
                            </CardContent>
                            <CardActions>
                                <Button>Read More</Button>
                            </CardActions>
                        </Card>
                    );
                })}
                </Body>
                <Sidebar></Sidebar>
            </HomeWrapper>
        );
    }
};
