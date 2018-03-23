/**
 * Author: Ruo
 * Create: 2018-03-20
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import {autorun, toJS} from 'mobx';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Gesture from 'material-ui-icons/Gesture';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemSecondaryAction} from 'material-ui/List';
import Grid from 'material-ui/Grid';

const GameBox = styled(Card)`
  width: 100%;
`;

@inject('GlobalStore', 'UserStore', 'GaymeStore') @observer
export class Gayme extends React.Component {
    componentWillUnmount() {
        const {GaymeStore} = this.props;
        GaymeStore.disconnect();
    }

    render() {
        const {GaymeStore} = this.props;
        const playerList = GaymeStore.playerList;
        return (
            <GameBox className="gayme">
                <CardHeader
                    title="Gayme"
                    subheader="It is a game"
                />
                <CardContent style={{overflow: 'auto'}}>
                    <Grid container direction="row">
                        <Grid item xs={3}>
                            <List className="player-list">
                                {_.map(playerList, (v, k) => {
                                    const isMe = GaymeStore.socket.id === k;
                                    return [
                                        <ListItem button key={k}>
                                            <ListItemText
                                                className={isMe ? 'me' : ''}
                                                primary={`${k} `}
                                            />
                                            {!isMe && <ListItemSecondaryAction className='article-list-delete-btn'>
                                                <IconButton
                                                    onClick={() => GaymeStore.sendBattlePost(k)}
                                                >
                                                    <Gesture/>
                                                </IconButton>
                                            </ListItemSecondaryAction>}
                                        </ListItem>,
                                        <Divider className="divider" key={`${k}-divider`}/>
                                    ];
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={9}>

                        </Grid>
                    </Grid>
                </CardContent>
            </GameBox>
        );
    }
};
