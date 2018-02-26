/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description: 入口页面组件名必须为Index
 */
import _ from 'lodash';
import React from 'react';
import {observable, action, autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {Header, Sidebar, SignUpMob, LoginMob, WriteMob, ArticleCard} from 'DFComponents';
import {Body, Button, Model} from 'DFUIs';
import {theme, rem} from 'DFStyles';

// import Cookies from 'js-cookie';

const HomeWrapper = styled.div`
    margin: 0 auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    ${theme.hideScrollbar};
    &.fix {
        overflow: hidden;
    }
`;
const LogBox = styled.div`
    position: absolute;
    top: 0;
    right: 4px;
    ${theme.fontFamily()}
    & > button {
        margin-right: 1px;
        width: 100px;
        height: 30px;
        font-size: 12px;
        vertical-align: top;
    }
`;
const Logo = styled.span`
    display: inline-block;
    height: ${rem(theme.logoHeight)};
    line-height: ${rem(theme.logoHeight)};
    margin-borrom: 5px;
    padding: 0 10px;
    background-color: ${theme.colors.red};
    ${theme.fontFamily()};
    font-size: 20px;
    user-select: none;
    cursor: pointer;
    a {
      color: #fff;
    }
`;

@inject('UserStore')
@observer
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMob = ::this.toggleMob;
        this.closeMob = ::this.closeMob;
        autorun(() => {
            if (this.props.UserStore && this.props.UserStore.store.get('hasLogin') === true) {
                this.closeMob();
            }
        });
    }

    @observable mobStatus = null;

    @action
    toggleMob(mobName) {
        this.mobStatus = this.mobStatus !== mobName && mobName;
    }

    closeMob() {
        this.toggleMob(null);
    }

    render() {
        const {UserStore} = this.props;
        const hasLogin = UserStore.store.get('hasLogin');
        return (

            <HomeWrapper className={this.mobStatus ? 'fix' : null}>
                <Header>
                    <Logo>{_.toUpper('Playground')}</Logo>
                    <LogBox>
                        {!hasLogin && <Button onClick={() => this.toggleMob('login')}>Log In</Button>}
                        {!hasLogin && <Button onClick={() => this.toggleMob('signUp')}>Sign Up</Button>}

                        {hasLogin && <Button onClick={() => UserStore.logout()}>Log Out</Button>}
                        {hasLogin && <Button onClick={() => this.toggleMob('write')}>Write</Button>}
                    </LogBox>
                </Header>
                <Body>
                <ArticleCard
                    header="“熊猫财富之旅”收官 跨界融合创造新价值"
                    publishTime="2010.01.20"
                    author="Drowsy Flesh"
                    summary="<p>近日，由熊猫金控主办的“熊猫财富之旅”收官。五天四夜里，天海新世纪号豪华邮轮搭载熊猫金控创始人赵伟平在内的千位商界大佬及创业创富者，共度了一次跨界创新的“奇幻漂流”之旅。</p><p>本次活动共设“起航 · 思想远行”、“乘风 · 天地共鸣”、“登陆 · 奇幻之旅”、“破浪 · 聚变未来”、“凯旋· 心灵沉淀”5大模块，包含10多场主题活动，分别针对产业升级、AI商业化、区块链、新消费等极具潜力性和增长性领域进行深入解读和探讨。</p>"
                />
                <ArticleCard
                    header="header"
                    publishTime="2010.01.20"
                    author="Drowsy Flesh"
                    summary="简单摘要"
                />
                </Body>
                <Sidebar></Sidebar>
                <SignUpMob
                    show={!hasLogin && this.mobStatus === 'signUp'}
                    onClose={this.closeMob}
                />
                <LoginMob
                    show={!hasLogin && this.mobStatus === 'login'}
                    onClose={this.closeMob}
                />
                <WriteMob
                    renderType={this.props.renderType}
                    show={hasLogin && this.mobStatus === 'write'}
                    onClose={this.closeMob}
                />
            </HomeWrapper>
        );
    }
};
