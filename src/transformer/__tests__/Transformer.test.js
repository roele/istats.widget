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

import Transformer from '../Transformer';
import {input,output} from './Transformer.res.js';

test('Transformer handles null', () => {
    expect(Transformer.transform(null)).toEqual({});
});

test('Transformer handles undefined', () => {
    expect(Transformer.transform(undefined)).toEqual({});
});

test('Transformer handles empty string', () => {
    expect(Transformer.transform('')).toEqual({});
});

test('Transformer tranforms istats object', () => {
    expect(Transformer.transform(input)).toEqual(output);
});
