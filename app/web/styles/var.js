/**
 * Author: Ruo
 * Create: 2018-01-04
 * Description: 基础的样式变量
 */

import _ from 'lodash';
import styled, {css} from 'styled-components';
import Color from 'color';

/**
 * rem
 * @param size
 * @param baseFontSize
 */
export const rem = (size, baseFontSize = 16) => `${size / baseFontSize}rem`;

/**
 * color
 * @param color
 * @param alpha
 */
export const color = ({color, alpha = 1}) => Color(color).alpha(alpha).rgb().string();
/**
 * fontFamily
 * @param myFontName
 */
export const fontFamily = (myFontName = 'Geo') => css`
    font-family: ${_.isEmpty(myFontName) ? null : `'${myFontName}',`} "Microsoft YaHei", system, -apple-system, ".SFNSDisplay-Regular", HelveticaNeue, LucidaGrande, "PingFang SC", "Hiragino Sans GB", "sans-serif";
`;
/**
 * fontSize
 * @param size
 */
export const fontSize = (size = 16) => css`
    font-size: ${rem(size)};
`;

/**
 * textOverflow
 * @param lineNum
 */
export const textOverflow = (lineNum = 1) => lineNum === 1 ? css`
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
` : css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lineNum};
    overflow: hidden;
`;

/**
 * color
 * @type {{white: string, red: string, black: string}}
 */
export const colors = {
    white: Color('#fff').alpha(1).rgb().string(),
    red: Color('#850607').alpha(1).rgb().string(),
    black: Color('#060813').alpha(1).rgb().string(),
};

/**
 * boxShadow
 * @param dp 高度
 * @param color 颜色（16进制）
 * @param alpha 透明度（0-1）
 */
export const boxShadow = ({dp = 1, shadowColor = colors.black, alpha = 0.5}) => css`
    box-shadow: 0 ${dp * 1}px ${dp * 5}px ${Color(shadowColor).alpha(alpha).rgb().string()};
`;

/**
 * transition
 * @param target
 * @param duration
 */
export const transition = ({target = 'all', duration = 0.3}) => css`transition: ${target} ${duration}s;`

/**
 * marginTrim
 * @param direction h/v
 * @param value
 */
export const marginTrim = ({direction = 'h', value = 0}) => css`
  &:first-of-type {
    ${direction === 'h' ? `margin-left:${value}` : (direction === 'v' ? `margin-top: ${value}` : null)};
    ${direction === 'all' ? `margin-left:${value};margin-top:${value}` : null};
  }
  &:last-of-type {
    ${direction === 'h' ? `margin-right:${value}` : (direction === 'v' ? `margin-bottom: ${value}` : null)};
    ${direction === 'all' ? `margin-right:${value};margin-bottom:${value}` : null};
  }
`;

/**
 * hideScrollbar
 */
export const hideScrollbar = css`
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }
    & {
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }
`;