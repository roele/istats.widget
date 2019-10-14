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

import IStatsParser from '../IStatsParser.js';
import {input, output} from './IStatsParser.res.js';

test('Parser handles null', () => {
  expect(IStatsParser.parse(null)).toEqual({});
});

test('Parser handles undefined', () => {
  expect(IStatsParser.parse(undefined)).toEqual({});
});

test('Parser handles empty string', () => {
  expect(IStatsParser.parse('')).toEqual({});
});

test('Parser handles number', () => {
  expect(IStatsParser.parse(0)).toEqual({});
});

test('Parser handles istats input', () => {
  expect(IStatsParser.parse(input)).toEqual(output);
});

test('Parser handles istats partial input', () => {
  let input = '--- CPU Stats ---\n' +
              'CPU temp:               47.63°C     ▁▂▃▅▆▇\n' +
              '\n' +
              '--- Fan Stats ---\n' +
              'Total fans in system:   2\n' +
              'Fan 0 speed:            2172 RPM    ▁▂▃▅▆▇\n' +
              'Fan 1 speed:            1995 RPM    ▁▂▃▅▆▇\n' +
              'For more stats run `istats extra` and follow the instructions.';

  let output = {
      "cpu": {
          "cpu-temp": "47.6"
      },
      "fan": {
          "total-fans-in-system": "2",
          "fan-0-speed": "2172",
          "fan-1-speed": "1995"
      }
  };
  expect(IStatsParser.parse(input)).toEqual(output);
});

test('Parser handles istats input with zero value', () => {
  let input = '--- Fan Stats ---\n' +
              'Total fans in system:   1\n' +
              'Fan 0 speed:            0 RPM    ▁▂▃▅▆▇\n' +
              'For more stats run `istats extra` and follow the instructions.';

  let output = {
      "fan": {
          "total-fans-in-system": "1",
          "fan-0-speed": "0"
      }
  };
  expect(IStatsParser.parse(input)).toEqual(output);
});
