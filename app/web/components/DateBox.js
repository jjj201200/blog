/**
 * Author: Ruo
 * Create: 2018-01-03
 * Description: 日期盒子，他是导航栏用于放置日期按钮的组件
 */

import React from 'react';
import styled from 'styled-components';

const DateBoxWrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: #00041a;
  color: #fff;
  position: absolute;
  bottom: 0;
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
  vertical-align: top;
  text-align: center;
  font-family: 'Montserrat';
  user-select: none;
  &.active > span {
    background-color: #5a0303;
  }
  & > span {
    display: inline-block;
    width: 84px;
    vertical-align: top;
    cursor: pointer;
  }
`;

const MonthBox = styled.div`
  display: block;
  width: 1000px;
  margin: 0 auto;
  //height: 30px;
  //line-height: 30px;
  & > * {
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Month = styled.div`
  height: 100px;
  display: inline-block;
  margin-right: 1px;
  //width: 20px;
  //height: 20px;
  vertical-align: top;
  //background-color: #400404;
  transition: all .3s;
  cursor: pointer;
  & > span {
    position: relative;
    display: inline-block;
    padding: 0 3px;
    width: 20px;
    height: calc(100% - 3px);
    line-height: 171px;
    text-align: center;
    font-size: 16px;
    color: #9a9898;
    border-bottom: 3px solid transparent;
    transition: all .15s;
    &:hover {
      background-color: #b30f0f;
      border-bottom-color: #980707;
      color: rgba(0, 0, 0, 0.5);
    }
    &:after {
      content: 'MONTH';
      display: none;
      position: absolute;
      top: 0px;
      left: 3px;
      width: 18px;
      height: 74px;
      line-height: 18px;
      font-size: 16px;
      box-sizing: border-box;
      text-align: center;
      //font-family: 'Mountains of Christmas';
      color: rgba(0,0,0,0.5);
      word-wrap: break-word;
      writing-mode: vertical-rl;
    }
  }
  &.active > span {
    background-color: #850607;
    margin-right: 1px;
    color: #fff;
    border-bottom: 3px solid #610505;
    &:after {
      display: block;
    }
  }
`;

const DayBox = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  height: 100px;
  & > * {
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Day = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1px;
  width: 20px;
  height: 97px;
  line-height: 174px;
  vertical-align: top;
  text-align: center;
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  transition: all .15s;
  border-bottom: 3px solid transparent;
  font-size-adjust: 0.5;
  &:hover {
    background-color: #8e0606;
    border-bottom-color: #980707;
  }
  &.active {
    padding: 0 3px;
    background-color: #860606;
    border-bottom: 3px solid #610505;
    &:after {
      display: block;
    }
  }
  &:after {
    content: 'DAY';
    display: none;
    position: absolute;
    top: 0;
    left: 2px;
    width: 80%;
    height: 50px;
    line-height: 22px;
    font-size: 16px;
    box-sizing: border-box;
    text-align: center;
    //font-family: 'Mountains of Christmas';
    color: rgba(0,0,0,0.5);
    word-wrap: break-word;
    writing-mode: vertical-rl;
  }
`;

export const DateBox = () => {
    return (
        <DateBoxWrapper>
            <MonthBox>
                <Month>
                    <span>01</span>
                </Month>
                <Month>
                    <span>02</span>
                </Month>
                <Month>
                    <span>03</span>
                </Month>
                <Month className="active">
                    <span>04</span>
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
                </Month>
                <Month>
                    <span>05</span>
                </Month>
                <Month>
                    <span>06</span>
                </Month>
                <Month>
                    <span>07</span>
                </Month>
                <Month>
                    <span>08</span>
                </Month>
                <Month>
                    <span>09</span>
                </Month>
                <Month>
                    <span>10</span>
                </Month>
                <Month>
                    <span>11</span>
                </Month>
                <Month>
                    <span>12</span>
                </Month>
            </MonthBox>
        </DateBoxWrapper>
    );
};