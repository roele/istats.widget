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

import React, { Component } from 'react';

class Stat extends Component {

    /*renderStat(title, icon, percentage, temperature) {
        const chartClass = 'chart ' +  title.replace(/\s/g, '-').toLowerCase(),
              iconClass = 'icon ' + icon
              ;

        const c = Math.floor(2 * Math.PI * cfg.radius);
        const p = c / 100 * percentage;

        return (
            <div className={chartClass}>
                <i className={iconClass}></i>
                <svg width={cfg.width} height={cfg.height}>
                    <circle className="bg" r={cfg.radius} cx={cfg.width/2} cy={cfg.height/2}
                            style="stroke: transparent; stroke-width: 2; stroke-dasharray: ' + c + ' ' + c + '"/>';
                    <circle className="bar" r={cfg.radius} cx={cfg.width/2} cy={cfg.height/2}
                            style="stroke: #666; stroke-width: 2; stroke-dasharray: ' + p + ' ' + c + '" />';
                </svg>
                <div className="temp" style="font-size: 10px">{temperature}</div>
            </div>
        )
    }*/

    render() {
        return <div>Stat...</div>;
    }

}

export default Stat;
