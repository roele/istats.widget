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

 //TODO: uncomment once übersicht supports importing react
import React from 'react';

//TODO: unsupported, hence the <link> in {@link #renderStats}
//import './index.css';

import IStatsParser from './src/parser/IStatsParser.js';
import Transformer from './src/transformer/Transformer.js';

//TODO: modularize once übersicht supports importing react
//import Stat from './src/components/Stat.jsx';
//import Error from './src/components/Error.jsx';

const cfg = {
    /* Temperature unit [CF] */
    tempUnit: 'C',
    /* Position */
    top: '320px',
    left: '10px',
    color: '#666',
    animations: true,
    /* Chart */
    width: '74',
    height: '40',
    radius: '18',
    strokeWidth: '2',
    /* Icon */
    iconSize: '1.0rem',
    iconLineHeight: '2.5rem',
    /* Label */
    labelSize: '0.625rem'
};

export const command = '/usr/local/bin/istats';

export const refreshFrequency = 5000;

export const className = `
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue';
    font-size: 16px;
    color: ${cfg.color};
    top: ${cfg.top};
    left: ${cfg.left};
`;

const MAX_CPU_TEMP = 90,
      MAX_FAN_SPEED = 6000;

const renderError = (error) => {
    return (
        <div>
            {String(error)}
        </div>
    );

    //TODO: modularize once übersicht supports importing react
    //return (
    //    <Error />
    //);
}

const renderStat = (title, iconName, percentage, value) => {
    const c = Math.floor(2 * Math.PI * cfg.radius);
    const p = c / 100 * percentage;

    //TODO: Configure things around radius
    // Charts are rotated 90°, so cx = y and cy = x
    // 90deg --> cx = y, cy = x
    // cx = width / 2
    // cy = height / 2
    // radius = r - stroke-width / 2

    return (
        <div className="stat">
            <i className={"icon " + iconName} style={{ fontSize: cfg.iconSize, lineHeight: cfg.iconLineHeight }}></i>
            <svg width={cfg.width} height={cfg.height}>
                <circle r={cfg.radius - (cfg.strokeWidth / 2)} cx={cfg.width / 2} cy={cfg.height / 2}
                    style={{ stroke: 'transparent', strokeWidth: cfg.strokeWidth, strokeDasharray: c + ' ' + c }} />;
                <circle r={cfg.radius - (cfg.strokeWidth / 2)} cx={cfg.width / 2} cy={cfg.height / 2}
                    style={{ stroke: cfg.color, strokeWidth: cfg.strokeWidth, strokeDasharray: p + ' ' + c }} />;
            </svg>
            <div className="text" style={{ fontSize: cfg.labelSize }}>{value}</div>
        </div>
    );
}

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
}

const getIcon = (data, key) => {
    if (key === 'cpu') {
        return 'icon-cpu';
    } else if (key.startsWith('fan')) {
        let cls = 'icon-fan';
        if (cfg.animations) {
            let percentage = getPercentage(data, key),
                rndPercentage = Math.ceil(percentage / 20) * 20;
            cls += ' animation-fan-' + clamp(rndPercentage, 0, 100);
        }
        return cls;
    } else if (key === 'battery') {
        let percentage = getPercentage(data, key);
        let icon = [
            { value: 95, name: 'full' },
            { value: 80, name: 'eighty' },
            { value: 60, name: 'sixty' },
            { value: 40, name: 'forty' },
            { value: 20, name: 'twenty' },
            { value: 0, name: 'empty' }
        ].find(element => {
            return percentage > element.value;
        });
        return 'icon-battery' + (icon && icon.name || 'empty');
    }
    return '';
}

const getPercentage = (data, key) => {
    if (key === 'cpu') {
        return Math.floor(data[key]['cpu-temp'][0] / MAX_CPU_TEMP * 100);
    } else if (key.startsWith('fan')) {
        return Math.floor(data[key]['fan-speed'][0] / MAX_FAN_SPEED * 100);
    } else if (key === 'battery') {
        return data[key]['current-charge'][1];
    } else {
        return undefined;
    }
}

const getValue = (data, key) => {
    if (key === 'cpu') {
        return (cfg.tempUnit === 'F')
            ? Math.floor(data[key]['cpu-temp'][0] * 1.8 + 32) + '°F'
            : data[key]['cpu-temp'][0] + '°C';
    } else if (key.startsWith('fan')) {
        return data[key]['fan-speed'][0] + 'RPM';
    } else if (key === 'battery') {
        return data[key]['current-charge'][1] + '%';
    } else {
        return undefined;
    }
}

const renderStats = (output) => {
    const parsedData = IStatsParser.parse(output),
          data = Transformer.transform(parsedData),
          stats = Object.keys(data).map(key => {
              return renderStat(
                  key,
                  getIcon(data, key),
                  getPercentage(data, key),
                  getValue(data, key)
              );
          });

    // FIXME: fix style href
    return (
        <div className="stats">
            <link rel="stylesheet" type="text/css" href="new-istats.widget/index.css"></link>
            {stats}
        </div>
    );

    //TODO: modularize once übersicht supports importing react
    //return (
    //    <Stat />
    //);
};

export const render = ({ output, error }) => {
    return error ? renderError(error) : renderStats(output);
};
