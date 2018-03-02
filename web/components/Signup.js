/* global require */
/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: sign up mob
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

@inject('UserStore')
@observer
class SignUpMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.handleSubmit = ::this.handleSubmit;
        this.handleMouseDownPassword = ::this.handleMouseDownPassword;
        this.handleClickShowPasssword = ::this.handleClickShowPasssword;
    }

    @observable showPassword = false;

    @action('handleSubmit')
    handleSubmit(e) {
        e.preventDefault();
        const {UserStore} = this.props;
        UserStore.signUp({
            username: $('form.sign-up [id="sign-up-username"]').val(),
            password: $('form.sign-up [id="sign-up-password"]').val(),
            confirmPassword: $('.sign-up [name="sign-up-confirm-password"]').val(),
            email: $('form.sign-up [name="sign-up-email"]').val(),
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
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <Form className="sign-up">
                        <List>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="sign-up-username">Username</InputLabel>
                                    <Input
                                        id="sign-up-username"
                                        name="username"
                                        // value={this.state.amount}
                                        // onChange={this.handleChange('amount')}
                                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="sign-up-password">Password</InputLabel>
                                    <Input
                                        id="sign-up-password"
                                        name="password"
                                        type={this.showPassword ? 'text' : 'password'}
                                        // value={this.state.password}
                                        // onChange={this.handleChange('password')}
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
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="sign-up-confirm-password">Confirm Password</InputLabel>
                                    <Input
                                        id="sign-up-confirm-password"
                                        name="confirmPassword"
                                        type={this.showPassword ? 'text' : 'password'}
                                        // value={this.state.password}
                                        // onChange={this.handleChange('password')}
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
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="sign-up-email">Email</InputLabel>
                                    <Input
                                        id="sign-up-email"
                                        name="email"
                                        // value={this.state.amount}
                                        // onChange={this.handleChange('amount')}
                                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <Grid container justify={'flex-end'}>
                                    <Button variant="raised" color="primary" onClick={this.handleSubmit}>Sign Up</Button>
                                </Grid>
                            </ListItem>
                        </List>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }
};
export {SignUpMob};