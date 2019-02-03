/**
 * Author: Ruo
 * Create: 2018-01-03
 * Description: 卡片
 */

import React from 'react';
import styled, {css} from 'styled-components';
import {theme} from 'DFStyles';
export const CardCss = css`
  ${theme.boxShadow({dp: 1, color: theme.colors.red})};
  ${theme.transition({target: 'box-shadow',duration: 0.3})};
  &:hover {
    ${theme.boxShadow({dp: 6, color: theme.colors.red})};
  }
`;
export const Card = styled.div`
  position: relative;
  margin: 10px 5px;
  padding: 10px;
  min-height: 50px;
  box-sizing: border-box;
  overflow: visible;
  
  ${theme.fontFamily()};
  //border: 4px solid ${theme.colors.black};
  ${CardCss};
`;
