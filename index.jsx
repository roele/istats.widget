/**
 * Copyright 2019 Roland Schaer
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { css } from 'uebersicht';

//import './index.css';

import IStatsParser from './src/parser/IStatsParser.js';

//import Stat from './src/components/Stat.jsx';
//import Error from './src/components/Error.jsx';

export const command = '/usr/local/bin/istats';
export const refreshFrequency = 5000;

export const className = `
    font-family: 'Helvetica Neue';
    font-size: 16px;
    width: 100%;
    height: 100%;

    top: 20px;
    left: 20px;
`;

const stat = css({
    'position': 'relative',
    'float': 'left',
    'margin': '0rem 0rem 0rem 0rem',
    'i': {
        'text-align': 'center',
        'position': 'absolute',
        'width': '100%'
    },
    '.temp': {
        'text-align': 'center',
        'display': 'block'
    },
    'svg': {
        'transform': 'rotate(-90deg)'
    },
    'circle': {
        'fill': 'transparent'
    }
});

const icon = css({
    'font-family': 'Icons',
    'background': 'none',
    'width': 'auto',
    'height': 'auto',
    'font-style': 'normal',

    '.icon-cpu:before': {
        'content': '"\\f002"'
    },
    '.icon-carbattery:before': {
        'content': '"\\f553"'
    },
    '.icon-fan:before': {
        'content': '"\\f66f"'
    }
});

const cfg = {
    width: '74',
    height: '40',
    radius: '18'
};


const MAX_CPU_TEMP = 90,
      MAX_FAN_SPEED = 5000;

const renderError = (error) => {
    return (
        <div>
            {String(error)}
        </div>
    );

    //return (
    //    <Error />
    //);
}

const renderStat = (title, iconName, percentage, value) => {
    //const statClass = 'stat ' + title.replace(/\s/g, '-').toLowerCase(),
    //      iconClass = 'icon ' + iconName
    //      ;

    const c = Math.floor(2 * Math.PI * cfg.radius);
    const p = c / 100 * percentage;

    return (
        <div className={stat}>
            <i className={icon}></i>
            <svg width={cfg.width} height={cfg.height}>
                <circle r={cfg.radius} cx={cfg.width/2} cy={cfg.height/2}
                        style={{stroke: 'transparent', strokeWidth: 2, strokeDasharray: c + ' ' + c}} />;
                <circle r={cfg.radius} cx={cfg.width/2} cy={cfg.height/2}
                        style={{stroke: '#666', strokeWidth: 2, strokeDasharray: p + ' ' + c}} />;
            </svg>
            <div className="temp" style={{fontSize: '10px'}}>{value}</div>
        </div>
    )
}

const getIcon = (prop) => {
    switch (prop) {
        case 'cpu':
            return 'icon-cpu';
        case 'fan':
            return 'icon-fan';
        case 'battery':
            return 'icon-carbattery';
        default:
            return '';
    }
}

// TODO support multi-values
const getPercentage = (data,prop) => {
    switch (prop) {
        case 'cpu':
            return Math.floor(data[prop]['cpu-temp'] / MAX_CPU_TEMP * 100);
        case 'fan':
            return Math.floor(data[prop]['fan-0-speed'] / MAX_FAN_SPEED * 100);
        case 'battery':
            return data[prop]['current-charge'][1];
        default:
            return undefined;
    }
}

// TODO support multi-values
const getValue = (data,prop) => {
    switch (prop) {
        case 'cpu':
            //TODO support F
            return data[prop]['cpu-temp'] + '°C';
        case 'fan':
            return data[prop]['fan-0-speed'] + 'RPM';
        case 'battery':
            return data[prop]['current-charge'][1] + '%';
        default:
            return undefined;
    }
}

const renderStats = (output) => {
    const data = IStatsParser.parse(output),
          stats = Object.keys(data).map(prop => {
              return renderStat(
                  prop, getIcon(prop),
                  getPercentage(data,prop),
                  getValue(data,prop)
              );
          });

    return (
        <div>{stats}</div>
    )

    //const data = parseOutput(output);
    //return (
    //    <Stat />
    //);
};

export const render = ({ output, error }) => {
    return error ? renderError(error) : renderStats(output);
};
