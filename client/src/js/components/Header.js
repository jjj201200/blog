/**
 * Author: Ruo
 * Create: 2018-01-02
 * Description: 头部
 */

import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';

const HeaderWarpper = styled.div`
  height: 100px;
`;

const YearBox = styled.div`
    height: 30px;
    line-height: 30px;
    & > * {
        &:last-child {
          margin-right: 0;
        }
    }
`;

const Year = styled.div`
  display: inline-block;
  margin-right: 1px;
  width: calc(100% / 12);
  text-align: center;
  font-family: 'Montserrat';
  user-select: none;
  cursor: pointer;
`;

const DayBox = styled.div`
  position: relative;
  height: 70px;
  & > * {
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Day = styled.div`
  display: inline-block;
  margin-right: 1px;
  width: calc(70% / 31);
  height: 67px;
  line-height: 100px;
  text-align: center;
  font-family: 'Montserrat';
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
  &.active {
    padding: 0 3px;
    height: 67px;
    background-color: #860606;
    border-bottom: 3px solid #a90909;
  }
`;

@observer
class Header extends React.Component {
    render() {
        return (
            <HeaderWarpper>
                <YearBox>
                    <Year>2018</Year>
                </YearBox>
                <DayBox>
                    <Day>01</Day>
                    <Day>02</Day>
                    <Day>03</Day>
                    <Day>04</Day>
                    <Day className="active">05</Day>
                    <Day>06</Day>
                    <Day>07</Day>
                    <Day>08</Day>
                    <Day>09</Day>
                    <Day>10</Day>
                    <Day>11</Day>
                    <Day>12</Day>
                    <Day>13</Day>
                    <Day>14</Day>
                    <Day>15</Day>
                    <Day>16</Day>
                    <Day>17</Day>
                    <Day>18</Day>
                    <Day>19</Day>
                    <Day>20</Day>
                    <Day>21</Day>
                    <Day>22</Day>
                    <Day>23</Day>
                    <Day>24</Day>
                    <Day>25</Day>
                    <Day>26</Day>
                    <Day>27</Day>
                    <Day>28</Day>
                    <Day>29</Day>
                    <Day>30</Day>
                    <Day>31</Day>
                </DayBox>
            </HeaderWarpper>
        );
    }
}

export {Header};
