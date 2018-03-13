/**
 * Author: Ruo
 * Create: 2018-01-03
 * Description: 内容容器
 */

import React from 'react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';

export const Body = styled.div`
  position: absolute;
  display: flex;
  top: ${rem(theme.headerHeight)};
  bottom: 0;
  left: 0;
  right: 0;
  min-width: ${rem(theme.mainWidth)};
  // width: ${rem(theme.mainWidth)};
  margin: 0 auto;
  padding: 1rem;
`;
