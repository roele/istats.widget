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

export let config = {
    /* Available stat keys, in order of rendering */
    stats: [
        {key:'cpu.cpu-temp'},
        'fan.fan-0-speed',
        'fan.fan-1-speed',
        'fan.fan-N-speed', // non-existing
        'battery.current-charge',
        'other.non-existing', // non-existing
        {key:'extra.tc1c-core-1-temp',icon:'icon-cpu-processor'},
        'extra.tc2c-core-2-temp'
    ],
    /* Temperature unit, either 'C' or 'F' */
    tempUnit: 'C',
    /* Widget position */
    position: 'top-left',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    /* Enable animations */
    animations: true,
    /* Stat position */
    width: '74',
    height: '40',
    radius: '18',
    strokeWidth: '2',
    /* Stat  color */
    color: '#666',
    /* Stat icon sizes */
    iconSize: '1.0rem',
    iconLineHeight: '2.5rem',
    /* Stat label size */
    labelSize: '0.625rem'
};

export const output = '--- CPU Stats ---\n\
CPU temp:               47.63°C     ▁▂▃▅▆▇\n\
\n\
--- Fan Stats ---\n\
Total fans in system:   2\n\
Fan 0 speed:            2172 RPM    ▁▂▃▅▆▇\n\
Fan 1 speed:            1995 RPM    ▁▂▃▅▆▇\n\
\n\
--- Battery Stats ---\n\
Battery health:         Good\n\
Cycle count:            435         ▁▂▃▅▆▇  43.5%\n\
Max cycles:             1000\n\
Current charge:         5981 mAh    ▁▂▃▅▆▇  100%\n\
Maximum charge:         6049 mAh    ▁▂▃▅▆▇  90.7%\n\
Design capacity:        6669 mAh\n\
Battery temp:           33.69°C\n\
\n\
--- Extra Stats ---\n\
TCGC PECI GPU:          72.0°C      ▁▂▃▅▆▇\n\
TC1C Core 1 temp: 42.0° C    ▁▂▃▅▆▇\n\
TC2C Core 2 temp: 43.0° C    ▁▂▃▅▆▇\n\
TC3C Core 3 temp: 42.0° C    ▁▂▃▅▆▇\n\
TC4C Core 4 temp: 44.0° C    ▁▂▃▅▆▇\n\
TM0P Memory Slot Proximity: 56.88°C     ▁▂▃▅▆▇\n\
TPCD Platform Controller Hub Die: 65.0°C      ▁▂▃▅▆▇\n\
For more stats run `istats extra` and follow the instructions.';

export const output_2 = '--- CPU Stats ---\n\
CPU temp:               47.63°C     ▁▂▃▅▆▇\n\
\n\
--- Fan Stats ---\n\
Total fans in system:   2\n\
Fan 0 speed:            4172 RPM    ▁▂▃▅▆▇\n\
Fan 1 speed:            4995 RPM    ▁▂▃▅▆▇\n\
\n\
--- Battery Stats ---\n\
Battery health:         Good\n\
Cycle count:            435         ▁▂▃▅▆▇  43.5%\n\
Max cycles:             1000\n\
Current charge:         5981 mAh    ▁▂▃▅▆▇  100%\n\
Maximum charge:         6049 mAh    ▁▂▃▅▆▇  90.7%\n\
Design capacity:        6669 mAh\n\
Battery temp:           33.69°C\n\
\n\
--- Extra Stats ---\n\
TCGC PECI GPU:          72.0°C      ▁▂▃▅▆▇\n\
TC1C Core 1 temp: 42.0° C    ▁▂▃▅▆▇\n\
TC2C Core 2 temp: 43.0° C    ▁▂▃▅▆▇\n\
TC3C Core 3 temp: 42.0° C    ▁▂▃▅▆▇\n\
TC4C Core 4 temp: 44.0° C    ▁▂▃▅▆▇\n\
TM0P Memory Slot Proximity: 56.88°C     ▁▂▃▅▆▇\n\
TPCD Platform Controller Hub Die: 65.0°C      ▁▂▃▅▆▇\n\
For more stats run `istats extra` and follow the instructions.';
