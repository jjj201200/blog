/**
 * Author: Ruo
 * Create: 2018-02-24
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
// import {Modal as AntdModel} from 'antd';

export const Model = styled(({children, ...rest}) => {
    return (
        <div {...rest}>{children}</div>
    );
})`
  button {
    border-radius: 0;
  }
  .ant-modal-content {
    border-radius: 0;
  }
`;