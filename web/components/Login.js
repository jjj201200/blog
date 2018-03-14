/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: login
 */

import $ from 'jquery';
import React from 'react';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';
import {Form, Label, LabelName, Submit} from 'DFUIs';
import {Mob} from 'DFComponents';
import GBS from 'DFStores';
import Dialog, {DialogTitle, DialogContent, DialogContentText} from 'material-ui/Dialog';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

@inject('UserStore') @observer
class LoginMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.handleSubmit = ::this.handleSubmit;
        this.handleClickShowPasssword = ::this.handleClickShowPasssword;
        this.handleMouseDownPassword = ::this.handleMouseDownPassword;
    }
    @observable showPassword = false;

    @action
    handleSubmit(e) {
        e.preventDefault();
        this.props.UserStore.login({
            username: $('#sign_in_dialog [name="username"]').val(),
            password: $('#sign_in_dialog [name="password"]').val(),
        });
    }
    @action('handleClickShowPasssword')
    handleClickShowPasssword() {
        this.showPassword = !this.showPassword;
    };

    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    render() {
        const {show, onClose} = this.props;
        return (
            <Dialog open={show} onClose={onClose} fullWidth>
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
                    <Form id="sign_in_dialog" method="post" action="/">
                        <List>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="sign-in-username">Username</InputLabel>
                                    <Input id="sign-in-username" name="username"/>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor=""></InputLabel>
                                    <Input
                                        id="sign-in-password"
                                        name="password"
                                        type={this.showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.handleClickShowPasssword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {this.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <Grid container justify={'flex-end'}>
                                    <Button variant="raised" color="primary" onClick={this.handleSubmit}>Sign In</Button>
                                </Grid>
                            </ListItem>
                        </List>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }
};
export {LoginMob};
