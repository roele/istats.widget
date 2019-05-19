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

export const input = {
    "cpu": {
        "cpu-temp": "47.6"
    },
    "fan": {
        "total-fans-in-system": "2",
        "fan-0-speed": "2172",
        "fan-1-speed": "1995"
    },
    "battery": {
        "battery-health": ["Good"],
        "cycle-count": ["435", 43.5],
        "max-cycles": ["1000"],
        "current-charge": ["5981", 100],
        "maximum-charge": ["6049", 90.7],
        "design-capacity": ["6669"],
        "battery-temp": ["33.6"]
    },
    "extra": {
        "tc1c-core-1-temp": "42.0",
        "tc2c-core-2-temp": "43.0",
        "tc3c-core-3-temp": "42.0",
        "tc4c-core-4-temp": "44.0",
    }
};

export const output = {
    "cpu": {
        "cpu-temp": ["47.6"]
    },
    "battery": {
        "battery-health": ["Good"],
        "cycle-count": ["435", 43.5],
        "max-cycles": ["1000"],
        "current-charge": ["5981", 100],
        "maximum-charge": ["6049", 90.7],
        "design-capacity": ["6669"],
        "battery-temp": ["33.6"]
    },
    "extra": {
        "tc1c-core-1-temp": "42.0",
        "tc2c-core-2-temp": "43.0",
        "tc3c-core-3-temp": "42.0",
        "tc4c-core-4-temp": "44.0",
    },
    "fan-0": {
        "fan-speed": ["2172"]
    },
    "fan-1": {
        "fan-speed": ["1995"]
    }
};