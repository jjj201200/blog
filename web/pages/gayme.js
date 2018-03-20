/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description: 入口页面组件名必须为Index
 */
import React from 'react';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {Body} from 'DFUIs';
import {theme} from 'DFStyles';
import CssBaseline from 'material-ui/CssBaseline';
import {Header, Gayme} from 'DFComponents';
import Snackbar from 'material-ui/Snackbar';
// import Cookies from 'js-cookie';


@inject('GlobalStore') @observer
class Index extends React.Component {
    render() {
        const {GlobalStore} = this.props;
        const {open, anchorOrigin, autoHideDuration, onClose, message, action} = GlobalStore.snackbar;
        return (
            <div>
                {/*<CssBaseline key="reboot-style"/>*/}
                <Header title="GayMe"/>
                <Body>
                <Gayme/>
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