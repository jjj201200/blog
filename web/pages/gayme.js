/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description: 入口页面组件名必须为Index
 */
import React from 'react';
import {autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {Body} from 'DFComponents/uis';
import {theme} from 'DFStyles';
import CssBaseline from 'material-ui/CssBaseline';
import {Header, ArticleList, Gayme, Cards} from 'DFComponents';
import Snackbar from 'material-ui/Snackbar';
// import Cookies from 'js-cookie';
const {Route, Link} = require("react-router-dom");
// import Sockette from 'sockette';
import io from 'socket.io-client';

@inject('GlobalStore') @observer
class Index extends React.Component {
    render() {
        const {GlobalStore} = this.props;
        const {open, anchorOrigin, autoHideDuration, onClose, message, action} = GlobalStore.snackbar;
        return (
            <div>
                {/*<CssBaseline key="reboot-style"/>*/}
                <Header/>
                <Body>
                <Route path="/cards" component={Cards}/>
                <Route path="/gayme" component={Gayme}/>
                <Route exact path="/" component={ArticleList}/>
                </Body>
                <Snackbar
                    className="global-snackbar"
                    open={open}
                    anchorOrigin={anchorOrigin}
                    autoHideDuration={autoHideDuration}
                    SnackbarContentProps={{
                        'aria-describedby': 'global-snackbar',
                    }}
                    onClose={onClose}
                    message={<span id="global-snackbar">{message}</span>}
                    action={action}
                />
            </div>
        );
    }
}