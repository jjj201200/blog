/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description:
 */
import React from 'react';

import ClientTemplate from 'DFLibs/clientTemplate';

// import HomeView from '../home';

export default class Home extends React.Component {
    render() {
        return (
            <ClientTemplate
                // Component={HomeView}
                ComponentName={'Home'}
                styleSheet={this.styleSheet}
            />
        );
    }
}
