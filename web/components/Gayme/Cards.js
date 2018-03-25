/**
 * Author: Ruo
 * Create: 2018-03-24
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import {inject, observer} from 'mobx-react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import Divider from 'material-ui/Divider';
import {NumberField} from 'DFComponents';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemSecondaryAction} from 'material-ui/List';

@inject('GaymeStore', 'CardsStore') @observer
class CardsView extends React.Component {
    constructor(props) {
        super(props);
        this.onClickCard = ::this.onClickCard;
    }

    componentWillMount() {
        const {CardsStore} = this.props;
    }

    /**
     * 卡牌点击载入编辑器事件
     * TODO 考虑未保存的情况
     */
    onClickCard(cardId) {
        const {CardsStore} = this.props;
        CardsStore.currentCard = CardsStore.cardList.get(cardId);
    }

    render() {
        const that = this;
        const {CardsStore, classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title="Cards"
                    subheader="It is a cards' manager"
                />
                <CardContent className={classes.cardContent}>
                    <Grid container direction="row">
                        <Grid item xs={3} className={classes.cardEditor}>
                            <Grid container direction="column">
                                <Grid item className={classes.cardEditor}>
                                    <Typography variant="subheading">
                                        Card Editor
                                    </Typography>
                                    <FormControl fullWidth className={classes.cardEditorItem}>
                                        <InputLabel
                                            className={classes.cardEditorLabel}
                                            htmlFor="target-type"
                                        >Target Type</InputLabel>
                                        <Select
                                            onChange={(e) => {
                                                CardsStore.currentCard.targetType = e.target.value;
                                                CardsStore.currentCard.hasEdited = true;
                                            }}
                                            value={CardsStore.currentCard.targetType}
                                            inputProps={{
                                                name: 'target-type',
                                                id: 'target-type',
                                            }}
                                        >
                                            <MenuItem value={0}>Enemy</MenuItem>
                                            <MenuItem value={1}>Own</MenuItem>
                                            <MenuItem value={2}>Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth className={classes.cardEditorItem}>
                                        <InputLabel
                                            htmlFor="card-name"
                                        >Card Name</InputLabel>
                                        <Input
                                            onChange={(e) => {
                                                CardsStore.currentCard.name = e.target.value;
                                                CardsStore.currentCard.hasEdited = true;
                                            }}
                                            value={CardsStore.currentCard.name}
                                            id="card-name"
                                            name="card-name"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.cardEditorItem}>
                                        <TextField
                                            label="Type"
                                            value={CardsStore.currentCard.type}
                                            onChange={(e) => {
                                                CardsStore.currentCard.type = e.target.value;
                                                CardsStore.currentCard.hasEdited = true;
                                            }}
                                            InputProps={{
                                                inputComponent: NumberField,
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.cardEditorItem}>
                                        <TextField
                                            label="Attack"
                                            value={CardsStore.currentCard.attack}
                                            onChange={(e) => {
                                                CardsStore.currentCard.attack = e.target.value;
                                                CardsStore.currentCard.hasEdited = true;
                                            }}
                                            InputProps={{
                                                inputComponent: NumberField,
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.cardEditorItem}>
                                        <TextField
                                            label="Defend"
                                            value={CardsStore.currentCard.defend}
                                            onChange={(e) => {
                                                CardsStore.currentCard.defend = e.target.value;
                                                CardsStore.currentCard.hasEdited = true;
                                            }}
                                            InputProps={{
                                                inputComponent: NumberField,
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.cardEditorItem}>
                                        <TextField
                                            label="Duration"
                                            value={CardsStore.currentCard.duration}
                                            onChange={(e) => {
                                                CardsStore.currentCard.duration = e.target.value;
                                                CardsStore.currentCard.hasEdited = true;
                                            }}
                                            InputProps={{
                                                inputComponent: NumberField,
                                            }}
                                        />
                                    </FormControl>
                                    <div className={classes.buttonGroup}>
                                        <Button
                                            className={classes.button}
                                            variant="raised"
                                            color="secondary"
                                            onClick={CardsStore.createNew}
                                        >
                                            New
                                        </Button>
                                        <Button
                                            onClick={CardsStore.update}
                                            className={classes.button}
                                            variant="raised"
                                            color="secondary"
                                            disabled={!CardsStore.currentCard.hasSaved}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            onClick={CardsStore.deleteOne}
                                            className={classes.button}
                                            variant="raised"
                                            color="default"
                                            disabled={!CardsStore.currentCard.hasSaved}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={CardsStore.create}
                                            className={classes.button}
                                            variant="raised"
                                            color="primary"
                                            disabled={CardsStore.currentCard.hasSaved}
                                        >
                                            Save new
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} className={classes.gameCardBox}>
                            {_.map(CardsStore.cardListObject, (cardData, cardId) => {
                                return (
                                    <Card
                                        key={cardId}
                                        className={classes.gameCard}
                                        onClick={() => {
                                            that.onClickCard(cardId);
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
                                            </List>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const styles = theme => ({
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        flexGrow: 0,
        flexShrink: 0,
    },
    cardContent: {
        display: 'flex',
        overflow: 'auto',
    },
    cardEditor: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },
    cardEditorItem: {
        '& label': {
            fontSize: '0.8rem',
            top: 6,
        },
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px -0.5rem',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
        flexGrow: 1,
    },
    gameCardBox: {
        display: 'flex',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
        overflow: 'auto',
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
        padding: '0 3px',
        '& h3': {
            textAlign: 'center',
        },
        '& p': {
            fontSize: 12,
        },
    }
});
const Cards = withStyles(styles)(CardsView);
export {Cards};