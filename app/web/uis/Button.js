/**
 * Author: Ruo
 * Create: 2018-01-03
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
// import {Button as AntDButton} from 'antd';
import {theme} from 'DFStyles';
const {colors} = theme;

export const Button = styled(({children, ...rest}) => {
    return (
      <button {...rest}>{children}</button>
    );
})`
  background-color: ${colors.red};
  color: ${colors.white};
  ${theme.fontFamily()}
  ${theme.boxShadow({color: colors.red})}
  ${theme.transition({duration: 0.3})}
  border: none;
  outline: none;
  border-radius: 0;
`;
