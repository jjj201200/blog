/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: 表单组件
 */

import React from 'react';
import styled from 'styled-components';
import {Button} from './Button';
import {theme, rem} from 'DFStyles';

export const Form = styled.form`
  margin: 10px auto 30px;
`;
export const Label = styled.label`
  margin: 10px auto;
  width: fit-content;
  height: 40px;
  line-height: 40px;
  display: block;
  ${theme.fontFamily()}
`;
export const LabelName = styled.span`
  display: inline-block;
  height: 40px;
  line-height: 40px;
  width: ${rem(130)};
  padding-right: 20px;
  text-align: right;
`;
export const Input = styled.input`
  height: ${rem(20)};
  width: ${rem(180)};
  text-indent: 2px;
  ${theme.fontFamily('')};
  vertical-align: middle;
`;
export const Submit = styled(Button)`
    width: 20%;
    position: absolute;
    right: -4px;
    height: 30px;
    bottom: -30px;
    box-shadow: none;
`;