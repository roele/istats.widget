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

class Stat extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.percentage) return ('');

        const c = Math.floor(2 * Math.PI * this.props.config.radius);
        const p = c / 100 * this.props.percentage;

        //TODO: Configure things around radius
        // Charts are rotated 90°, so cx = y and cy = x
        // 90deg --> cx = y, cy = x
        // cx = width / 2
        // cy = height / 2
        // radius = r - stroke-width / 2

        return (
            <div className={"stat " + this.props.title}>
                <i className={"icon " + this.props.icon} style={{ fontSize: this.props.config.iconSize, lineHeight: this.props.config.iconLineHeight }}></i>
                <svg width={this.props.config.width} height={this.props.config.height}>
                    <circle r={this.props.config.radius - (this.props.config.strokeWidth / 2)} cx={this.props.config.width / 2} cy={this.props.config.height / 2}
                        style={{ stroke: 'transparent', strokeWidth: this.props.config.strokeWidth, strokeDasharray: c + ' ' + c }} />;
                    <circle r={this.props.config.radius - (this.props.config.strokeWidth / 2)} cx={this.props.config.width / 2} cy={this.props.config.height / 2}
                        style={{ stroke: this.props.config.color, strokeWidth: this.props.config.strokeWidth, strokeDasharray: p + ' ' + c }} />;
                </svg>
                <div className="text" style={{ fontSize: this.props.config.labelSize }}>{this.props.value}</div>
            </div>
        );
    }

}

export default Stat;
