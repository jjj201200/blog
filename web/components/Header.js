/**
 * Author: Ruo
 * Create: 2018-02-27
 * Description:
 */

import React from 'react';
import PropTypes from 'prop-types';
import {observable, action, autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {SignUpMob, LoginMob, WriteMob} from 'DFComponents';

const {Route, Link} = require("react-router-dom");

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

@inject('UserStore', 'Routing') @observer
class HeaderView extends React.Component {
    @observable mobStatus = null;

    constructor(props) {
        super(props);
        this.toggleMob = ::this.toggleMob;
        this.closeMob = ::this.closeMob;
        autorun(() => {
            if (this.props.UserStore && this.props.UserStore.hasSignIn === true) {
                this.closeMob();
            }
        });
    }

    toggleMob(mobName) {
        if (this.mobStatus === mobName) {
            this.closeMob(mobName);
        } else this.openMob(mobName);
    }

    @action
    openMob(mobName) {
        this.mobStatus = mobName;
    }

    @action
    closeMob() {
        this.mobStatus = null;
    }

    render() {
        const {Routing, UserStore, classes, title} = this.props;
        const {push, goBack, location} = Routing;
        const hasSignIn = UserStore.hasSignIn;
        return [
            <AppBar key="app-bar" className={classes.root} position="fixed">
                <Toolbar>
                    {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>*/}
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <Grid container spacing={16} justify="flex-start" alignItems="center">
                                <Grid item>
                                    <Typography className={classes.flex} variant="title" color="inherit">
                                        {title || 'Playground'}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button color="inherit" onClick={() => {push('/gayme');}}>Gayme</Button>
                                    <Button color="inherit" onClick={() => {push('/');}}>back</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={16} justify="flex-end">
                                {!hasSignIn && <Grid item>
                                    <Button color="inherit" onClick={() => this.toggleMob('login')}>Sign In</Button>
                                </Grid>}
                                {!hasSignIn && <Grid item>
                                    <Button color="inherit" onClick={() => this.toggleMob('signUp')}>Sign Up</Button>
                                </Grid>}
                                {hasSignIn && <Grid item>
                                    <Button color="inherit" onClick={() => UserStore.logout()}>Log Out</Button>
                                </Grid>}
                                {hasSignIn && <Grid item>
                                    <Button color="secondary" variant="raised" onClick={() => this.toggleMob('write')}>Write</Button>
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>,
            <SignUpMob
                key="sign-up"
                show={!hasSignIn && this.mobStatus === 'signUp'}
                onClose={this.closeMob}
            />,
            <LoginMob
                key="sign-in"
                show={!hasSignIn && this.mobStatus === 'login'}
                onClose={this.closeMob}
            />,
            (hasSignIn && <WriteMob
                key="write"
                show={hasSignIn && this.mobStatus === 'write'}
                onClose={this.closeMob}
            />),
        ];
    }
}

HeaderView.propTypes = {
    classes: PropTypes.object.isRequired,
};
const Header = withStyles(styles)(HeaderView);
export {Header};
