/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: 侧边栏
 */
import React from 'react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';

export const Sidebar = styled.div`
  /*position: absolute;
  top: ${rem(theme.headerHeight)};
  bottom: 0;
  left: ${rem(theme.mainWidth)};
  right: 0;
  min-width: ${rem(theme.sidebarWidth)};
  width: ${rem(theme.sidebarWidth)};
  margin: 0 auto;
  overflow: auto;*/
  flex-grow: 2;
`;
