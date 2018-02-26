/**
 * Author: Ruo
 * Create: 2018-01-02
 * Description: 头部
 */

import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';

const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: ${rem(theme.headerHeight)};
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    z-index: 100;
`;
const HeaderInner = styled.div`
    position: relative;
    margin: 0 auto;
    width: ${rem(theme.bodyMinWidth)};
    padding: 0 4px;
`;


@observer
class Header extends React.Component {
    render() {
        return (
            <HeaderWrapper>
                <HeaderInner>
                    {this.props.children}
                </HeaderInner>
            </HeaderWrapper>
        );
    }
}

export {Header};
