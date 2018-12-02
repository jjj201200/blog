/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: 弹出框
 */

import React from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {theme, rem, color} from 'DFStyles';
import {Button, CardCss} from 'DFComponents/uis';

const MobWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${color({color: theme.colors.black, alpha: 0.8})};
    z-index: 100;
    ${CardCss};
    &.hide {
      display: none;
    }
    &.show {
      display: block;
    }
`;
const MobBox = styled.div`
    width: ${rem(450)};
    margin: 0 auto;
    box-sizing: border-box;
    border: 4px solid #840606;
    background-color: #ffffff;
    z-index: 100;
    position: absolute;
    top: ${rem(50)};
    left: 0;
    right: 0;
    ${CardCss};
`;
const MobHeader = styled.header`
    padding: 10px;
    margin: 1px;
    color: ${theme.colors.black};
    ${theme.fontFamily()};
    ${theme.fontSize(30)};
    text-align: center;
`;
const CloseBtn = styled(Button)`
    position: absolute;
    right: -4px;
    top: -19px;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
`;
@observer
export class Mob extends React.Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        const {header, children, show = false, onClose} = this.props;
        return (
            <MobWrapper className={show ? 'show' : 'hide'}>
                <MobBox>
                    <CloseBtn onClick={onClose}>Close</CloseBtn>
                    {header && <MobHeader>{header}</MobHeader>}
                    {children}
                </MobBox>
            </MobWrapper>
        );
    }
};