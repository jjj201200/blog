/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description: 入口页面组件名必须为Index
 */
import React from 'react';
import styled from 'styled-components';
import {Body} from 'DFUIs';
import {theme} from 'DFStyles';
import CssBaseline from 'material-ui/CssBaseline';
import {Header, ArticleList} from 'DFComponents';
import Snackbar from 'material-ui/Snackbar';
// import Cookies from 'js-cookie';

const HomeWrapper = styled.div`
    margin: 0 auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    ${theme.hideScrollbar};
    &.fix {
        overflow: hidden;
    }
`;

const Index = () => {
    return (
        <HomeWrapper className={this.mobStatus ? 'fix' : null}>
            <CssBaseline key="reboot-style"/>
            <Header/>
            <Body>
            <ArticleList/>
            </Body>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        </HomeWrapper>
    )
};
