/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: login
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
class LoginMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.handleSubmit = ::this.handleSubmit;
    }
    @action handleSubmit(e) {
        e.preventDefault();
        this.props.UserStore.login({
            username: $('form.login [name="username"]').val(),
            password: $('form.login [name="password"]').val(),
        });
    }
    render() {
        const {show, onClose} = this.props;
        return (
            <Mob show={show} onClose={onClose} header={'Log In'}>
                <Form className="login" method="post" action="/">
                    <Label>
                        <LabelName>Username:</LabelName>
                        <Input type="text" name="username"/>
                    </Label>
                    <Label>
                        <LabelName>Password:</LabelName>
                        <Input type="password" name="password" autocomplete="current-password"/>
                    </Label>
                    <Submit onClick={this.handleSubmit}>GO</Submit>
                </Form>
            </Mob>
        );
    }
};
export {LoginMob};
