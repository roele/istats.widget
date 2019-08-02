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

/* eslint-disable react/prop-types */
import { React } from 'uebersicht';

import IStatsParser from '../parser/IStatsParser.js';
import Transformer from '../transformer/Transformer.js';

import Stat from './Stat.jsx';

class Stats extends React.Component {

    constructor(props) {
        super(props);

        //Maximum CPU temperature value (estimate)
        this.MAX_CPU_TEMP = 90;
        //Maximum fan speed value (estimate)
        this.MAX_FAN_SPEED = 6200;
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    getIcon(data, key) {
        if (key === 'cpu') {
            return 'icon-cpu';
        } else if (key.startsWith('fan')) {
            let cls = 'icon-fan';
            if (this.props.config.animations) {
                let percentage = this.getPercentage(data, key),
                    rndPercentage = Math.ceil(percentage / 20) * 20;
                cls += ' animation-fan-' + this.clamp(rndPercentage, 0, 100);
            }
            return cls;
        } else if (key === 'battery') {
            let icon;
            if (this.props.config.animations) {
                let percentage = this.getPercentage(data, key);
                icon = [
                    { value: 95, name: 'full' },
                    { value: 80, name: 'eighty' },
                    { value: 60, name: 'sixty' },
                    { value: 40, name: 'forty' },
                    { value: 20, name: 'twenty' },
                    { value: 0, name: 'empty' }
                ].find(element => {
                    return percentage > element.value;
                });
            }
            return 'icon-battery' + (icon && icon.name || 'full');
        }
        return '';
    }

    getPercentage(data, key) {
        if (!data) return undefined;

        if (key === 'cpu') {
            return Math.floor(data[key]['cpu-temp'][0] / this.MAX_CPU_TEMP * 100);
        } else if (key.startsWith('fan')) {
            return Math.floor(data[key]['fan-speed'][0] / this.MAX_FAN_SPEED * 100);
        } else if (key === 'battery') {
            return data[key]['current-charge'][1];
        }
        return undefined;
    }

    getValue(data, key) {
        if (!data) return undefined;

        if (key === 'cpu') {
            return (this.props.config.tempUnit === 'F')
                ? Math.floor(data[key]['cpu-temp'][0] * 1.8 + 32) + '°F'
                : data[key]['cpu-temp'][0] + '°C';
        } else if (key.startsWith('fan')) {
            return data[key]['fan-speed'][0] + 'RPM';
        } else if (key === 'battery') {
            return data[key]['current-charge'][1] + '%';
        }
        return undefined;
    }

    // #21 - CSS animations workaround
    resetFanAnimation (data, key) {
        if (this.props.config.animations && key.startsWith('fan')) {
            let stat = document.querySelector('[class*=' + key + '] i'),
                hasChanged = stat && stat.className != this.getIcon(data, key);
            if (stat && hasChanged) {
                let self = this;
                /* istanbul ignore next */
                window.requestAnimationFrame(function () {
                    stat.className = '';
                    window.requestAnimationFrame(function () {
                        stat.className = self.getIcon(data, key);
                    });
                });
            }
        }
    }

    render() {
        let parsedData = IStatsParser.parse(this.props.output),
            data = Transformer.transform(parsedData),
            stats = this.props.config.stats.map(key => {
                let icon = this.getIcon(data, key),
                    percentage = this.getPercentage(data, key),
                    value = this.getValue(data, key);
                this.resetFanAnimation(data, key);
                return <Stat
                    config={this.props.config}
                    title={key}
                    icon={icon}
                    percentage={percentage}
                    key={key}
                    value={value}
                />
            });

        return (
            <div className="stats">
                <link rel="stylesheet" type="text/css" href="istats.widget/index.css"></link>
                {stats}
            </div>
        );
    }

}

export default Stats;
