/**
 * Author: Ruo
 * Create: 2018-03-20
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import {observable, autorun, toJS} from 'mobx';
import styled from 'styled-components';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {observer, inject} from 'mobx-react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Gesture from 'material-ui-icons/Gesture';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import Card, {CardContent, CardHeader} from 'material-ui/Card';
import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemSecondaryAction} from 'material-ui/List';
import Grid from 'material-ui/Grid';

const GameBox = styled(Card)`
  width: 100%;
`;

@inject('GlobalStore', 'UserStore', 'GaymeStore') @observer
class GaymeView extends React.Component {
    constructor(props) {
        super(props);
        const {GaymeStore, UserStore} = props;
        autorun(() => {
            if (UserStore.userInitialed) { // 是否登录
                if (!GaymeStore.socket) { // 是否连接过
                    GaymeStore.connect(UserStore.currentUser);
                } else if (!GaymeStore.socket.connected) { // 没有连接过就重连
                    GaymeStore.reconnect();
                }
            }
        });
    }

    componentWillMount() {
        const {GaymeStore, UserStore} = this.props;
        if (GaymeStore.socket) GaymeStore.reconnect();
        else GaymeStore.connect(UserStore.currentUser);
    }

    componentWillUnmount() {
        const {GaymeStore} = this.props;
        GaymeStore.disconnect();
    }

    onCloseAcceptDialog() {
        const {GaymeStore} = this.props;
        GaymeStore.battlePostDialog = false;
    }

    render() {
        const that = this;
        const {GaymeStore, classes} = this.props;
        const {playerList, clickedPlayer} = GaymeStore;
        const hasClickedPlayer = Object.keys(clickedPlayer).length > 0;
        return (
            <GameBox className={[classes.card, 'gayme'].join(' ')}>
                <CardHeader
                    className={classes.cardHeader}
                    title="Gayme"
                    subheader="It is a game"
                />
                <CardContent className={classes.cardContent}>
                    <Grid container direction="row">
                        <Grid item xs={3}>
                            <List className="player-list">
                                {_.map(playerList, (playerData, userId) => {
                                    const isMe = GaymeStore.socket.id === playerData.sid;
                                    return [
                                        <ListItem button key={userId} onClick={() => {
                                            GaymeStore.clickedPlayer = playerData;
                                        }}>
                                            <ListItemText
                                                className={[isMe ? 'me' : '', userId].join(' ')}
                                                primary={`${playerData.username} `}
                                            />
                                            {!isMe && <ListItemSecondaryAction className='article-list-delete-btn'>
                                                <IconButton
                                                    onClick={() => GaymeStore.sendBattlePost(userId)}
                                                >
                                                    <Gesture/>
                                                </IconButton>
                                            </ListItemSecondaryAction>}
                                        </ListItem>,
                                        <Divider className="divider" key={`${userId}-divider`}/>
                                    ];
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={9} className={classes.playerInfoBox}>
                            {hasClickedPlayer && <Grid container direction="row">
                                <Grid item xs={12}>
                                    <List>
                                        <ul>
                                            <ListSubheader className={classes.playerInfoBoxSubHeader}>
                                                基本信息<Divider/>
                                            </ListSubheader>
                                            <ListItem>
                                                <ListItemText
                                                    className={classes.playerInfoBoxListItem}
                                                    primary={String(clickedPlayer.username)}
                                                    secondary={'用户名'}
                                                />
                                                <ListItemText
                                                    className={classes.playerInfoBoxListItem}
                                                    primary={`${String(clickedPlayer.playerData.sum).padEnd(4, ' ')} 场`}
                                                    secondary={'游戏场次'}
                                                />
                                                <ListItemText
                                                    className={classes.playerInfoBoxListItem}
                                                    primary={`${String(clickedPlayer.playerData.win).padEnd(4, ' ')} 场`}
                                                    secondary={'胜利场次'}
                                                />
                                            </ListItem>
                                        </ul>
                                        <ul>
                                            <ListSubheader className={classes.playerInfoBoxSubHeader}>
                                                <div className={classes.layerInfoBoxSubHeaderBox}>
                                                    <span style={{flexGrow: 1}}>拥有卡牌</span>
                                                    <div style={{borderRight: '1px solid #e0e0e0'}}>
                                                        <IconButton>
                                                            <Add/>
                                                        </IconButton>
                                                        <IconButton>
                                                            <Remove/>
                                                        </IconButton>
                                                    </div>
                                                    <div>
                                                        <IconButton>
                                                            <AddCircle/>
                                                        </IconButton>
                                                        <IconButton>
                                                            <RemoveCircle/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <Divider/>
                                            </ListSubheader>

                                            <ListItem>
                                                {/*<ListItemText*/}
                                                {/*primary={clickedPlayer.cards}*/}
                                                {/*/>*/}
                                            </ListItem>
                                        </ul>

                                    </List>
                                </Grid>
                            </Grid>}
                        </Grid>
                    </Grid>
                    <Dialog open={GaymeStore.battlePostDialog.open} onClose={this.onCloseDeleteDialog}>
                        <DialogTitle>
                            Receive a challenge.
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you want to accept it from {}?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onCloseDeleteDialog}>
                                Cancel
                            </Button>
                            <Button variant="raised" color="primary" onClick={() => {
                                that.onCloseAcceptDialog();
                                GaymeStore.acceptPost();
                            }}>
                                Accept
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </GameBox>
        );
    }
};
const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        flexGrow: 0,
        flexShrink: 0,
    },
    cardContent: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    playerInfoBox: {
        overflow: 'auto',
    },
    playerInfoBoxSubHeader: {
        backgroundColor: '#ffffff',
    },
    layerInfoBoxSubHeaderBox: {
        display: 'flex',
    },
    playerInfoBoxListItem: {
        display: 'flex',
        flexDirection: 'column-reverse',
    }
};
const Gayme = withStyles(styles)(GaymeView);
export {Gayme};
