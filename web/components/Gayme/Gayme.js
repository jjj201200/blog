/**
 * Author: Ruo
 * Create: 2018-03-20
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';

const GameBox = styled(Card)`
  width: 100%;
`;
export class Gayme extends React.Component {
    render() {
        return (
            <GameBox>
                <CardHeader>Gayme</CardHeader>
            </GameBox>
        );
    }
};
