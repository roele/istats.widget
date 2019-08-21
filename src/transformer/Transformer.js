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

const handleCPUs = (input, output, key) => {
    output['cpu'] = {
        'cpu-temp': []
    };
    output['cpu']['cpu-temp'].push(input[key]['cpu-temp']);
}

const handleFans = (input, output, key) => {
    output['fan'] = {};
    Object.keys(input[key]).forEach(prop => {
        output['fan'][prop] = [input[key][prop]];
    });
}

const handleExtras = (input, output, key) => {
    output['extra'] = {};
    Object.keys(input[key]).forEach(prop => {
        output['extra'][prop] = [input[key][prop]];
    });
}

const handleKey = (input, output, key) => {
    if (key === 'cpu') {
        handleCPUs(input, output, key);
        return true;
    }
    if (key === 'fan') {
        handleFans(input, output, key);
        return true;
    }
    if (key === 'extra') {
        handleExtras(input, output, key);
        return true;
    }
    return false;
}

/**
 * Transformer provides methods to transform an object.
 */
 export default class Transformer {

    /**
     * Transforms an object to another object by re-arranging it's keys and values.
     * 
     * @param {Object} input object to transform
     * @return {Object} transformed object
     */
    static transform(input) {
        let output = {};
        if (!input) return output;
        Object.keys(input).forEach(key => {
            if (!handleKey(input, output, key)) {
                // copy original value
                output[key] = JSON.parse(JSON.stringify(input[key]));
            }
        });
        return output;
    }

 }
