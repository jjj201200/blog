/**
 * Author: Ruo
 * Create: 2018-01-02
 * Description: 首页
 */

import React from 'react';
import styled from 'styled-components';
import {Header} from '../components';

const HomeWrapper = styled.div`
  margin: 0 auto;
  background-color: #00041a;
  color: #fff;
  & > *{
    width: 1000px;
    margin: 0 auto;
  }
`
export const Home = () => {
    return (
        <HomeWrapper>
            <Header/>
        </HomeWrapper>
    );
};
