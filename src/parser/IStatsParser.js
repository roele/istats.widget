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

const isEmpty = (line) => {
    return !line || line.match(/(\r|\n)/);
}

const isSection = (line) => {
    return line.match(/---.*?/);
}

const getSectionName = (line) => {
    return line.replace(/---\s+(.*?)\s+---/, '$1');
}

const getData = (line) => {
    let e = line.split(':'),
        k = e[0].toLowerCase().replace(/[ ]/g,'-').replace(/[\t\n\r]/g, ''),
        v = e.length > 1 ? e[1].trim().replace(/.*?(\d+)(\.\d{0,1})*.*/, '$1$2') : undefined,
        m = e.length > 1 ? e[1].trim().match(/.*?(\d{1,3})(\.\d{1})?%.*/, '$1$2') : false,
        p = e.length > 1 && m ? e[1].trim().replace(/.*?(\d{1,3})(\.\d{1})?%.*/, '$1$2') : undefined;

    return {
        key: k,
        value: v,
        percentage: p
    };
}

const handleSection = (section, o, data) => {
    if (section === 'CPU Stats') {
        addSection(o, 'cpu', data);
    }

    if (section === 'Fan Stats') {
        addSection(o, 'fan', data);
    }

    if (section == 'Battery Stats') {
        addSection(o, 'battery', data);
    }

    if (section == 'Extra Stats') {
        addSection(o, 'extra', data);
    }
}

const addSection = (obj, key, data) => {
    obj[key] = obj[key] || {};
    obj[key][data.key] = data.value;

    // TODO: handle more generically
    if (key === 'battery') {
        obj[key][data.key] = [data.value];
        if (data.percentage && !Number.isNaN(data.percentage)) {
            obj[key][data.key].push(Number.parseFloat(data.percentage));
        }
    }
}
/**
 * IStatsParser provides methods to parse istats CLI input.
 */export default class IStatsParser {

    /**
     * Parses the istats command line {@code input} into an object.
     * 
     * @param {String} output istats command line output
     * @return {Object} an object representing the istats command line output
     */
    static parse(output) {
        let o = {};

        if (!output) {
            return o;
        }

        let lines = output.split('\n'),
            section;

        while (lines.length > 0) {
          var line = lines.shift();

          if (isEmpty(line)) {
              section = undefined;
              continue;
          }

          if (isSection(line)) {
            section = getSectionName(line);
            continue;
          }

          let data = getData(line);

          if (!data.value) {
            continue;
          }

          handleSection(section, o, data);
        }

        return o;
    }

}
