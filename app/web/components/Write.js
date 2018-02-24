/**
 * Author: Ruo
 * Create: 2018-02-10
 * Description: write mode
 */
/* global require */

import $ from 'jquery';
import React from 'react';
import {action} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';
import {Form, Label, LabelName, Input, Submit} from 'DFUIs';
import {Mob} from 'DFComponents';
import GBS from 'DFStores';
import {DFEditor} from 'DFComponents';
// import LzEditor from 'react-lz-editor';

@inject('UserStore')
@observer
class WriteMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.handleSubmit = ::this.handleSubmit;
        this.receiveMarkdown = ::this.receiveMarkdown;
    }
    componentWillMount() {
    }

    @action handleSubmit(e) {
        e.preventDefault();
    }
    receiveMarkdown(content) {
        console.log("recieved markdown content", content);
    }

    render() {
        const {show, onClose} = this.props;
        return (
            <Mob show={show} onClose={onClose} header={'Write Article'}>
                <Form className="sign-up">
                    <DFEditor/>
                    {/*<Submit onClick={this.handleSubmit}>GO</Submit>*/}
                </Form>
            </Mob>
        );
    }
};
export {WriteMob};
