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
import Badge from 'material-ui/Badge';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
import Card, {CardContent, CardHeader} from 'material-ui/Card';
import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemSecondaryAction} from 'material-ui/List';
import Grid from 'material-ui/Grid';

const GameBox = styled(Card)`
  width: 100%;
`;

@inject('GlobalStore', 'UserStore', 'GaymeStore', 'CardsStore') @observer
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
            } else {
                GaymeStore.disconnect();
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

    onClosePostDialog() {
        this.props.GaymeStore.battlePostDialog.open = false;
    }

    render() {
        const that = this;
        const {GaymeStore, UserStore, CardsStore, classes} = this.props;
        const {playerList, clickedPlayer} = GaymeStore;
        const hasClickedPlayer = clickedPlayer.id !== undefined;
        const isOwn = UserStore.currentUser && clickedPlayer ? clickedPlayer.id === UserStore.currentUser.id : false;
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
                                            GaymeStore.selectPlayer(userId);
                                        }}>
                                            <ListItemText
                                                className={[isMe ? 'me' : '', userId].join(' ')}
                                                primary={`${playerData.nickname} `}
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
                            {hasClickedPlayer && ([
                                <List key="basic-information">
                                    <ListItem>
                                        <ListItemText
                                            className={classes.playerInfoBoxListItem}
                                            primary={clickedPlayer.nickname || ''}
                                            secondary={'Username'}
                                        />
                                        <ListItemText
                                            className={classes.playerInfoBoxListItem}
                                            primary={`${String(clickedPlayer.sum || 0).padEnd(4, ' ')} times`}
                                            secondary={'Total'}
                                        />
                                        <ListItemText
                                            className={classes.playerInfoBoxListItem}
                                            primary={`${String(clickedPlayer.win || 0).padEnd(4, ' ')} times`}
                                            secondary={'Win'}
                                        />
                                    </ListItem>
                                </List>,
                                <List key="card-list">
                                    <ListSubheader className={classes.playerInfoBoxSubHeader}>
                                        <div className={classes.layerInfoBoxSubHeaderBox}>
                                            <span style={{flexGrow: 1}}>Cards List</span>
                                            {isOwn && <Button
                                                size="small"
                                                variant="raised"
                                                color="secondary"
                                                disabled={!clickedPlayer.cards.hasEdited || GaymeStore.requestSending}
                                                style={{height: 'fit-content'}}
                                                onClick={GaymeStore.updatePlayerCard}
                                            >Update</Button>}
                                        </div>
                                        <Divider/>
                                    </ListSubheader>
                                    <ListItem className={classes.playerCardBox}>
                                        {_.map(clickedPlayer.cards.list, (cardData, cardId) => {
                                            return (
                                                <Card
                                                    key={cardId}
                                                    className={classes.gameCard}
                                                    onClick={() => {
                                                        // that.onClickCard(cardId);
                                                    }}
                                                >
                                                    <CardHeader
                                                        title={cardData.name}
                                                        subheader={`${CardsStore.TARGET_TYPE[cardData.targetType]} - T${cardData.type}`}
                                                    />
                                                    <CardContent className={classes.gameCardContent}>
                                                        <List>
                                                            <ListItem>
                                                                <ListItemText
                                                                    primary={String(cardData.consume)}
                                                                    secondary={'Consume'}
                                                                    className={classes.gameCardContentItem}
                                                                />
                                                                <ListItemText
                                                                    primary={String(cardData.attack)}
                                                                    secondary={'Attack'}
                                                                    className={classes.gameCardContentItem}
                                                                />
                                                                <ListItemText
                                                                    primary={String(cardData.defend)}
                                                                    secondary={'Defend'}
                                                                    className={classes.gameCardContentItem}
                                                                />
                                                                <ListItemText
                                                                    primary={String(cardData.duration)}
                                                                    secondary={'Duration'}
                                                                    className={classes.gameCardContentItem}
                                                                />
                                                            </ListItem>
                                                            {isOwn && [
                                                                <Divider key={`${cardData.id}-divider`}/>,
                                                                <ListItem key={cardData.id} className={classes.cardCounterBox}>
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            clickedPlayer.cards.subtract(cardId, 1);
                                                                        }}
                                                                    >
                                                                        <Remove/>
                                                                    </IconButton>
                                                                    <span>{clickedPlayer.cards.list[cardId].number}</span>
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            clickedPlayer.cards.add(cardId, 1);
                                                                        }}
                                                                    >
                                                                        <Add/>
                                                                    </IconButton>
                                                                </ListItem>
                                                            ]}
                                                        </List>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </ListItem>
                                </List>
                            ])}
                        </Grid>
                    </Grid>
                    <Dialog open={GaymeStore.battlePostDialog.open} onClose={this.onClosePostDialog}>
                        <DialogTitle>
                            Receive a challenge.
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you want to accept it from {GaymeStore.battlePostDialog.posterName}?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                that.onClosePostDialog();
                                GaymeStore.denyBattlePost();
                            }}>
                                Deny
                            </Button>
                            <Button variant="raised" color="primary" onClick={() => {
                                that.onClosePostDialog();
                                GaymeStore.acceptBattlePost();
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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    playerInfoBoxSubHeader: {
        backgroundColor: '#ffffff',
        zIndex: 2,
    },
    layerInfoBoxSubHeaderBox: {
        display: 'flex',
        alignItems: 'center',
    },
    playerInfoBoxListItem: {
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    playerCardBox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gameCard: {
        display: 'inline-block',
        cursor: 'pointer',
        margin: '0 10px 10px 0',
        width: 'auto',
        height: 'fit-content',
        flexGrow: 0,
        flexShrink: 0,
    },
    gameCardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
        '& li': {
            flexWrap: 'wrap',
        },
    },
    gameCardContentItem: {
        display: 'flex',
        flexDirection: 'column-reverse',
        flexGrow: 1,
        flexShrink: 0,
        padding: '0 12px',
        flexBasis: '30px',
        '& h3': {
            textAlign: 'center',
        },
        '& p': {
            fontSize: 12,
        },
        '&:last-child': {
            paddingRight: 0,
        },
    },
    cardCounterBox: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        padding: '0 12px',
        '& > span': {
            flexGrow: 1,
        }
    },
};
const Gayme = withStyles(styles)(GaymeView);
export {Gayme};
