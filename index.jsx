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

//import './index.css';

import IStatsParser from './src/parser/IStatsParser.js';

//import Stat from './src/components/Stat.jsx';
//import Error from './src/components/Error.jsx';

const cfg = {
    color: '#666',
    width: '74',
    height: '40',
    radius: '18',
    strokeWidth: '2'
};

export const command = '/usr/local/bin/istats';

export const refreshFrequency = 5000;

export const className = `
    font-family: 'Helvetica Neue';
    font-size: 16px;
    color: ${cfg.color};
    width: 100%;
    height: 100%;

    top: 20px;
    left: 20px;
`;

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
    const c = Math.floor(2 * Math.PI * cfg.radius);
    const p = c / 100 * percentage;

    return (
        <div className="stat">
            <i className={"icon " + iconName}></i>
            <svg width={cfg.width} height={cfg.height}>
                <circle r={cfg.radius} cx={cfg.width/2} cy={cfg.height/2}
                        style={{stroke: 'transparent', strokeWidth: cfg.strokeWidth, strokeDasharray: c + ' ' + c}} />;
                <circle r={cfg.radius} cx={cfg.width/2} cy={cfg.height/2}
                        style={{stroke: cfg.color, strokeWidth: cfg.strokeWidth, strokeDasharray: p + ' ' + c}} />;
            </svg>
            <div className="temp" style={{fontSize: '10px'}}>{value}</div>
        </div>
    );
}

const getIcon = (data,prop) => {
    if (prop === 'cpu') {
        return 'icon-cpu';
    } else if (prop ===  'fan') {
        return 'icon-fan';
    } else if (prop === 'battery') {
        let p = getPercentage(data,prop);
        if (p > 80) {
            return 'icon-batteryfull'
        }
        if (p > 60) {
            return 'icon-batteryeighty';
        }
        if (p > 40) {
            return 'icon-batterysixty';
        }
        if (p > 20) {
            return 'icon-batteryforty';
        }
        if (p > 10) {
            return 'icon-batterytwenty';
        }
        return 'icon-batteryempty';
    }
    return '';
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
                  prop, getIcon(data,prop),
                  getPercentage(data,prop),
                  getValue(data,prop)
              );
          });

    return (
        <div>
            <link rel="stylesheet" type="text/css" href="index.css"></link> 
            {stats}
        </div>
    );

    //const data = parseOutput(output);
    //return (
    //    <Stat />
    //);
};

export const render = ({ output, error }) => {
    return error ? renderError(error) : renderStats(output);
};
