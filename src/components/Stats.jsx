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

        //Default icon
        this.DEFAULT_ICON = 'icon-cpu-processor';
        //Maximum CPU temperature value (estimate)
        this.MAX_CPU_TEMP = 90;
        //Maximum GPU temperature value (estimate)
        this.MAX_GPU_TEMP = 90;
        //Maximum fan speed value (estimate)
        this.MAX_FAN_SPEED = 6200;
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    getIcon(data, key) {
        let ref = this.getRef(key);
        if (ref.obj === 'fan') {
            return this.getFanIcon(data, key);
        } else if (ref.obj === 'battery') {
            return this.getBatteryIcon(data, key);
        }
        return this.getIconForKey(data, key);
    }

    getFanIcon(data, key) {
        let cls = 'icon-fan';
        if (this.props.config.animations) {
            let percentage = this.getPercentage(data, key),
                rndPercentage = Math.ceil(percentage / 20) * 20;
            cls += ' animation-fan-' + this.clamp(rndPercentage, 0, 100);
        }
        return cls;
    }

    getBatteryIcon(data, key) {
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
        return 'icon-battery' + (icon && icon.name);
    }

    getIconForKey(data, key) {
        if (key.indexOf('cpu') > -1) {
            return 'icon-cpu-processor';
        }
        if (key.indexOf('gpu') > -1) {
            return 'icon-gpu-graphicscard';
        }
        if (key.indexOf('memory') > -1) {
            return 'icon-ram';
        }
        return '';
    }

    getPercentage(data, key) {
        let ref  = this.getRef(key);

        if (ref.obj === 'cpu') {
            return this.getPercentageValue(data[ref.obj][ref.prop][0], this.MAX_CPU_TEMP);
        } else if (ref.obj === 'fan') {
            return this.getPercentageValue(data[ref.obj][ref.prop][0], this.MAX_FAN_SPEED);
        } else if (ref.obj === 'battery') {
            return data[ref.obj][ref.prop][1];
        } else if (ref.obj === 'extra') {
            return this.getPercentageValue(data[ref.obj][ref.prop][0], this.MAX_GPU_TEMP);
        }
        return undefined;
    }

    getValue(data, key) {
        let ref = this.getRef(key);

        if (ref.obj === 'cpu') {
            return this.getTempValue(data[ref.obj][ref.prop][0]);
        } else if (ref.obj === 'fan') {
            return data[ref.obj][ref.prop][0] + 'RPM';
        } else if (ref.obj === 'battery') {
            return data[ref.obj][ref.prop][1] + '%';
        } else if (ref.obj === 'extra') {
            return this.getTempValue(data[ref.obj][ref.prop][0]);
        }
        return undefined;
    }

    getRef(key) {
        return {
            obj: key.replace(/(.*?)\.(.*)/, '$1'),
            prop: key.replace(/(.*?)\.(.*)/, '$2')
        }
    }

    getPercentageValue(value, maxValue) {
        return Math.floor(value / maxValue * 100);
    }

    getTempValue(value) {
        return (this.props.config.tempUnit === 'F')
                ? Math.floor(value * 1.8 + 32) + '°F'
                : value + '°C';
    }

    getClassName(key) {
        return key.replace(/\./, '-');
    }

    isObject(obj) {
        return typeof obj === 'object' && obj !== null;
    }

    // #21 - CSS animations workaround
    resetFanAnimation (data, key) {
        if (this.props.config.animations && key.startsWith('fan')) {
            let stat = document.querySelector('[class*=' + this.getClassName(key) + '] i'),
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
            stats = this.props.config.stats
                .filter(item => {
                    let key = this.isObject(item) ? item.key : item,
                        ref = this.getRef(key);
                    return data[ref.obj] && data[ref.obj][ref.prop];
                })
                .map(item => {
                    let key = this.isObject(item) ? item.key : item;
                    this.resetFanAnimation(data, key);

                    return <Stat
                        config={this.props.config}
                        title={this.getClassName(key)}
                        icon={this.isObject(item) ? (item.icon || this.DEFAULT_ICON ) : this.getIcon(data, key)}
                        percentage={this.getPercentage(data, key)}
                        key={key}
                        value={this.getValue(data, key)}
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
