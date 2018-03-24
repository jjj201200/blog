/**
 * Author: Ruo
 * Create: 2018-03-24
 * Description:
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
// import NumberFormat from 'react-number-format';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemSecondaryAction} from 'material-ui/List';

@inject('GlobalStore', 'UserStore', 'GaymeStore') @observer
class CardsView extends React.Component {
    render() {
        const {classes} = this.props;
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
                                    <FormControl fullWidth>
                                        <InputLabel
                                            className={classes.cardEditorLabel}
                                            htmlFor="card-name"
                                        >Card Name</InputLabel>
                                        <Input
                                            id="card-name"
                                            name="card-name"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            className={classes.cardEditorLabel}
                                            htmlFor="attack"
                                        >Attack Number</InputLabel>
                                        <Input
                                            id="attack"
                                            name="attack"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            className={classes.cardEditorLabel}
                                            htmlFor="defend"
                                        >Defend Number</InputLabel>
                                        <Input
                                            id="defend"
                                            name="defend"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            className={classes.cardEditorLabel}
                                            htmlFor="duration"
                                        >Duration Times</InputLabel>
                                        <Input
                                            id="duration"
                                            name="duration"
                                        />
                                    </FormControl>
                                    <div className={classes.buttonGroup}>
                                        <Button
                                            className={classes.button}
                                            variant="raised"
                                            color="default"
                                        >
                                            Delete
                                        </Button>
                                        <Button className={classes.button} variant="raised" color="secondary">
                                            Update
                                        </Button>
                                        <Button
                                            className={classes.button}
                                            variant="raised"
                                            color="primary">
                                            Create
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            <List className="player-list">
                            </List>
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
    cardEditorLabel: {
        fontSize: '0.8rem',
        top: 6,
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        margin: theme.spacing.unit,
    },
});
const Cards = withStyles(styles)(CardsView);
export {Cards};