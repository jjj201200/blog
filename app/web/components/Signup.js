/* global require */
/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: sign up mob
 */

import $ from 'jquery';
import React from 'react';
import {action} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';
import {Form, Label, LabelName, Input, Submit} from 'DFUIs';
import {Mob} from 'DFComponents';
import GBS from 'DFStores';

@inject('UserStore')
@observer
class SignUpMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.handleSubmit = ::this.handleSubmit;
    }
    @action handleSubmit(e) {
        e.preventDefault();
        const {UserStore} = this.props;
        UserStore.signUp({
            username: $('form.sign-up [name="username"]').val(),
            password: $('form.sign-up [name="password"]').val(),
            confirmPassword: $('.sign-up [name="confirmPassword"]').val(),
            email: $('form.sign-up [name="email"]').val(),
        });
    }
    render() {
        const {show, onClose} = this.props;
        return (
            <Mob show={show} onClose={onClose} header={'Sign Up'}>
                <Form className="sign-up">
                    <Label>
                        <LabelName>Username:</LabelName>
                        <Input type="text" name="username"/>
                    </Label>
                    <Label>
                        <LabelName>Password:</LabelName>
                        <Input type="password" name="password"/>
                    </Label>
                    <Label>
                        <LabelName>Confirm Password:</LabelName>
                        <Input type="password" name="confirmPassword"/>
                    </Label>
                    <Label>
                        <LabelName>Email:</LabelName>
                        <Input type="email" name="email"/>
                    </Label>
                    <Submit onClick={this.handleSubmit}>GO</Submit>
                </Form>
            </Mob>
        );
    }
};
export {SignUpMob};