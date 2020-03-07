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
import Stats from '../Stats';
import { config, output } from './Constants.res.js';

import { render } from '@testing-library/react';

const KEY_CPU_TEMP      = 'cpu.cpu-temp',
      CSS_STATS         = '.stats',
      CSS_STAT          = '.stat',
      CSS_STAT_ICON     = '.stat i',
      CLS_CPU_TEMP      = 'cpu-cpu-temp',
      CLS_FAN_0_SPEED   = 'fan-fan-0-speed',
      CLS_ICON_CPU      = 'icon-cpu-processor',
      CLS_ICON_FAN      = 'icon-fan',
      CLS_ANIMATION_FAN = 'animation-fan-40';

jest.mock('uebersicht');

describe('Stats component', () => {

    test('renders stats', () => {
        const {container} = render(<Stats config={config} output={output} />);

        const element = container.querySelector(CSS_STATS),
            stats = container.querySelectorAll(CSS_STAT),
            icons = container.querySelectorAll(CSS_STAT_ICON);

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();

        expect(stats).not.toBeNull();
        expect(stats).toBeInstanceOf(NodeList);
        expect(stats.length).toEqual(6);

        expect(icons).not.toBeNull();
        expect(icons).toBeInstanceOf(NodeList);
        expect(icons.length).toEqual(6);

        expect(stats[0].classList.contains(CLS_CPU_TEMP)).toBe(true);
        expect(icons[0].classList.contains(CLS_ICON_CPU)).toBe(true);

        expect(stats[1].classList.contains(CLS_FAN_0_SPEED)).toBe(true);
        expect(icons[1].classList.contains(CLS_ICON_FAN)).toBe(true);
        expect(icons[1].classList.contains(CLS_ANIMATION_FAN)).toBe(true);

        expect(stats[2].classList.contains('fan-fan-1-speed')).toBe(true);
        expect(icons[2].classList.contains(CLS_ICON_FAN)).toBe(true);

        expect(stats[3].classList.contains('battery-current-charge')).toBe(true);
        expect(icons[3].classList.contains('icon-batteryfull')).toBe(true);

        expect(stats[4].classList.contains('extra-tc1c-core-1-temp')).toBe(true);
        expect(icons[4].classList.contains(CLS_ICON_CPU)).toBe(true);

        expect(stats[5].classList.contains('extra-tc2c-core-2-temp')).toBe(true);
        expect(icons[5].classList.contains(CLS_ICON_CPU)).toBe(false);
    });

    test('renders temp unit F', () => {
        let cfg = Object.assign({}, config, {
            animations: false,
            stats: [
                KEY_CPU_TEMP
            ],
            tempUnit: 'F'
        });

        const { getByText } = render(<Stats config={cfg} output={output} />);

        expect(getByText('117°F')).toHaveTextContent('117°F');
    });

    test('renders stats w/o animation', () => {
        let cfg = Object.assign({}, config, {
            animations: false,
            stats: [
                KEY_CPU_TEMP,
                'fan.fan-0-speed',
                'extra.tm0p-memory-slot-proximity',
                {key:'extra.tpcd-platform-controller-hub-die'},
                'extra.tcgc-peci-gpu'
            ]
        });

        const {container} = render(<Stats config={cfg} output={output} />);

        const element = container.querySelector(CSS_STATS),
            stats = container.querySelectorAll(CSS_STAT),
            icons = container.querySelectorAll(CSS_STAT_ICON);

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();

        expect(stats).not.toBeNull();
        expect(stats).toBeInstanceOf(NodeList);
        expect(stats.length).toEqual(5);
        
        expect(icons).not.toBeNull();
        expect(icons).toBeInstanceOf(NodeList);
        expect(icons.length).toEqual(5);

        expect(stats[0].classList.contains(CLS_CPU_TEMP)).toBe(true);
        expect(icons[0].classList.contains(CLS_ICON_CPU)).toBe(true);

        expect(stats[1].classList.contains(CLS_FAN_0_SPEED)).toBe(true);
        expect(icons[1].classList.contains(CLS_ICON_FAN)).toBe(true);
        expect(icons[1].classList.contains(CLS_ANIMATION_FAN)).toBe(false);

        expect(stats[2].classList.contains('extra-tm0p-memory-slot-proximity')).toBe(true);
        expect(icons[2].classList.contains('icon-ram')).toBe(true);

        expect(stats[3].classList.contains('extra-tpcd-platform-controller-hub-die')).toBe(true);
        expect(icons[3].classList.contains(CLS_ICON_CPU)).toBe(true);

        expect(stats[4].classList.contains('extra-tcgc-peci-gpu')).toBe(true);
        expect(icons[4].classList.contains('icon-gpu-graphicscard')).toBe(true);
    });

    test('renders no data', () => {
        let cfg = Object.assign({}, config, {
            animations: false,
            stats: [
                KEY_CPU_TEMP
            ]
        }),
        noData = "";

        const {container} = render(<Stats config={cfg} output={noData} />);

        const element = container.querySelector(CSS_STATS),
            stats = container.querySelectorAll(CSS_STAT);

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();

        expect(stats).not.toBeNull();
        expect(stats).toBeInstanceOf(NodeList);
        expect(stats.length).toEqual(0);
    });

    test('ignores unknown section', () => {
        let unknown ='--- Unknown Stats ---\n' +
                    'TCGC PECI GPU:          72.0°C      ▁▂▃▅▆▇\n' +
                    'TC1C Core 1 temp: 42.0° C    ▁▂▃▅▆▇\n' +
                    'TC2C Core 2 temp: 43.0° C    ▁▂▃▅▆▇\n' +
                    'TC3C Core 3 temp: 42.0° C    ▁▂▃▅▆▇\n' +
                    'TC4C Core 4 temp: 44.0° C    ▁▂▃▅▆▇\n' +
                    'TM0P Memory Slot Proximity: 56.88°C     ▁▂▃▅▆▇\n' +
                    'TPCD Platform Controller Hub Die: 65.0°C      ▁▂▃▅▆▇\n' +
                    'For more stats run `istats extra` and follow the instructions.';

        const {container} = render(<Stats config={config} output={unknown} />);

        const element = container.querySelector(CSS_STATS),
            stats = container.querySelectorAll(CSS_STAT);

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();

        expect(stats).not.toBeNull();
        expect(stats).toBeInstanceOf(NodeList);
        expect(stats.length).toEqual(0);
    });

    function verifyPositionClass(cfg, out, expectedClass) {
        const {container} = render(<Stats config={cfg} output={out} />);

        const element = container.querySelector(CSS_STATS);

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass(expectedClass);
    }

    test('renders stats position top-left', () => {
        verifyPositionClass(config, output, 'top-left');
    });

    test('renders stats position top-right', () => {
        Object.assign(config, {position: 'top-right'});
        verifyPositionClass(config, output, 'top-right');
    });

    test('renders stats position bottom-left', () => {
        Object.assign(config, {position: 'bottom-left'});
        verifyPositionClass(config, output, 'bottom-left');
    });

    test('renders stats position bottom-right', () => {
        Object.assign(config, {position: 'bottom-right'});
        verifyPositionClass(config, output, 'bottom-right');
    });

    test('renders stats position default', () => {
        Object.assign(config, {position: undefined});

        const {container} = render(<Stats config={config} output={output} />);

        const element = container.querySelector(CSS_STATS);

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('stats');
        expect(element).not.toHaveClass('top-left');
    });

});
