/**
 * Author: Ruo
 * Create: 2018-03-25
 * Description: 数字文本域
 */

import React from 'react';
import styled from 'styled-components';
import {theme} from 'DFStyles';
import NumberFormat from 'react-number-format';

export class NumberField extends React.Component {
    render() {
        const {inputRef, onChange, ...other} = this.props;
        return (
            <NumberFormat
                {...other}
                ref={inputRef}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            value: values.value,
                        }
                    })
                }}
            />
        );
    };
}
