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
import {Sidebar, SignUpMob, LoginMob, WriteMob, ArticleCard} from 'DFComponents';
import {Body, Model} from 'DFUIs';
import {theme, rem} from 'DFStyles';
import Reboot from 'material-ui/Reboot';
import {Header} from 'DFComponents';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Button from 'material-ui/Button';

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

    }

    @observable mobStatus = null;

    render() {
        const {UserStore} = this.props;
        const hasLogin = UserStore.store.get('hasLogin');
        return (
            <HomeWrapper className={this.mobStatus ? 'fix' : null}>
                <Reboot key="reboot-style"/>
                <Header/>
                <Body>
                <Card>
                    <CardHeader
                        title="“熊猫财富之旅”收官 跨界融合创造新价值"
                        subheader={`Published In: 2010.01.20 - Author: Drowsy Flesh - Tags: React + Webpack`}
                    />
                    <CardContent>
                        <p>
                            近日，由熊猫金控主办的“熊猫财富之旅”收官。五天四夜里，天海新世纪号豪华邮轮搭载熊猫金控创始人赵伟平在内的千位商界大佬及创业创富者，共度了一次跨界创新的“奇幻漂流”之旅。
                        </p>
                        <p>
                            本次活动共设“起航 · 思想远行”、“乘风 · 天地共鸣”、“登陆 · 奇幻之旅”、“破浪 · 聚变未来”、“凯旋·
                            心灵沉淀”5大模块，包含10多场主题活动，分别针对产业升级、AI商业化、区块链、新消费等极具潜力性和增长性领域进行深入解读和探讨。
                        </p>
                    </CardContent>
                    <CardActions>
                        <Button>Read More</Button>
                    </CardActions>
                </Card>
                </Body>
                <Sidebar></Sidebar>

            </HomeWrapper>
        );
    }
};
