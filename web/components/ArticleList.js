/**
 * Author: Ruo
 * Create: 2018-03-14
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Button from 'material-ui/Button';
import draftToHtml from 'draftjs-to-html';


@inject('BlogStore', 'Routing') @observer
class ArticleList extends React.Component {
    componentWillMount() {
        const {BlogStore} = this.props;
        BlogStore.getArticleListByPublished();
    }
    render() {
        const {BlogStore, Routing} = this.props;
        const {push, goBack, location} = Routing;
        const articles = toJS(BlogStore.articleList);
        return (
            <div className="article-list">
                {_.map(articles, (v, k) => {
                    const publishDate = new Date(v.publishDate);
                    const tags = v.tags.length > 0 ? ` - tags: ${v.tags.join(' + ')}` : '';
                    const html = draftToHtml(v.summary);
                    return (
                        <Card key={v.id} style={{marginBottom: 20}}>
                            <CardHeader
                                title={v.title}
                                subheader={`${publishDate.toLocaleDateString()} - ${v.author.username}${tags}`}
                            />
                            <CardContent style={{padding: 0, margin: 16}}>
                                <div dangerouslySetInnerHTML={{__html: html}}/>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => push(`/article/${v.id}`)}>Read More</Button>
                            </CardActions>
                        </Card>
                    );
                })}
            </div>
        );
    }
}
export {ArticleList};
