/**
 * Author: Ruo
 * Create: 2018-03-24
 * Description:
 */
import React from 'react';
import {observer, inject} from 'mobx-react';
import {Body} from 'DFComponents/uis';
import {Header, ArticleList, Gayme, Cards} from 'DFComponents';
import Snackbar from 'material-ui/Snackbar';
// import {Route} from "../components/lib/Route";
// import styled from 'styled-components';
// import {theme} from 'DFStyles';
// import CssBaseline from 'material-ui/CssBaseline';
// import Cookies from 'js-cookie';

const {Route, Link} = require("react-router-dom");

@inject('GlobalStore', 'Routing') @observer
class Index extends React.Component {
    render() {
        const {GlobalStore, Routing} = this.props;
        const {open, anchorOrigin, autoHideDuration, onClose, message, action} = GlobalStore.snackbar;
        return (
            <div>
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