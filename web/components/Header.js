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
import {SignUpMob, LoginMob, WriteMob} from 'DFComponents';

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

@inject('UserStore')
@observer
class HeaderView extends React.Component {
    @observable mobStatus = null;

    constructor(props) {
        super(props);
        this.toggleMob = ::this.toggleMob;
        this.closeMob = ::this.closeMob;
        autorun(() => {
            if (this.props.UserStore && this.props.UserStore.store.get('hasLogin') === true) {
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
        const {UserStore, classes} = this.props;
        const hasLogin = UserStore.store.get('hasLogin');
        return [
            <AppBar key="app-bar" className={classes.root} position="fixed">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.flex} variant="title" color="inherit">
                        Playground
                    </Typography>
                    {!hasLogin && <Button color="inherit" onClick={() => this.toggleMob('login')}>Sign In</Button>}
                    {!hasLogin && <Button color="inherit" onClick={() => this.toggleMob('signUp')}>Sign Up</Button>}

                    {hasLogin && <Button color="inherit" onClick={() => UserStore.logout()}>Log Out</Button>}
                    {hasLogin && <Button color="secondary" variant="raised" onClick={() => this.toggleMob('write')}>Write</Button>}
                </Toolbar>
            </AppBar>,
            <SignUpMob
                key="sign-up"
                show={!hasLogin && this.mobStatus === 'signUp'}
                onClose={this.closeMob}
            />,
            <LoginMob
                key="sign-in"
                show={!hasLogin && this.mobStatus === 'login'}
                onClose={this.closeMob}
            />,
            <WriteMob
                key="write"
                show={hasLogin && this.mobStatus === 'write'}
                onClose={this.closeMob}
            />,

        ];
    }
}

HeaderView.propTypes = {
    classes: PropTypes.object.isRequired,
};
const Header = withStyles(styles)(HeaderView);
export {Header};