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
import { config, output, output_2 } from './Constants.res.js';

import { render } from '@testing-library/react';

jest.mock('uebersicht');

function verifyIcon(percentage) {
    let fan_0 = document.querySelector('.stat.fan-0 i');

    expect(fan_0).not.toBeNull();
    expect(fan_0).toBeInTheDocument();
    expect(fan_0).toHaveClass('animation-fan-' + percentage);
}

describe('Stats component', () => {

    test('renders stats', () => {

        render(<Stats config={config} output={output} />);

        const element = document.querySelector('.stats'),
            stats = document.querySelectorAll('.stat');

        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();

        expect(stats).not.toBeNull();
        expect(stats).toBeInstanceOf(NodeList);
        expect(stats.length).toEqual(4);
    });

    test('renders stats with resetFanAnimation', () => {
        const spy = jest.spyOn(window, 'requestAnimationFrame');

        render(<Stats config={config} output={output} />);

        let fan_0 = document.querySelector('.stat.fan-0 i');

        verifyIcon(40);

        // reset
        document.getElementsByTagName('html')[0].innerHTML = '';

        render(<Stats config={config} output={output_2} />);

        verifyIcon(80);

        // verify requestAnimationFrame callbacks
        requestAnimationFrame(() => {
            expect(fan_0).not.toHaveClass();
        });

        requestAnimationFrame(() => {
            expect(fan_0).toHaveClass('animation-fan-40');
        });

        expect(spy).toHaveBeenCalledTimes(2);
    });

});
