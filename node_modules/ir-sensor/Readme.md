
# ir-sensor

[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

get values from ev3 ir-sensor

## Installation

    $ npm install ev3-js-ir-sensor

## Usage

```js
var IRSensor = require('ir-sensor')
IRSensor(3).proximity // => 50
IRSensor(3).beacon(2) // => { heading: 0, distance: 100 }
IRSensor(3).remote(3) // => 1
```

## API

### IRSensor(port)

- `port` - number of the port that the IR sensor is connected to

**Returns:** instance of IRSensor

### .proximity
get the distance from the IR sensor to the nearest obstacle

**Returns:** number between 0 and 100

### .beacon(channel)
get the heading and distance to the beacon on the specified channel

**Returns:** object with heading and distance.

##### heading

value | state
---|---
between 1 and 25 | beacon to the right
0 | beacon straight ahead (or no beacon)
between -25 and -1 | beacon to the left

##### distance

value | state
---|---
between 0 and 100 | beacon distance
-128 | beacon not found

### .remote(channel)
get the current state of the IR remote on the specified channel

**Returns:** number between 0 and 11

value | state
---|---
0 |	none
1 |	red up
2 |	red down
3 |	blue up
4 |	blue down
5 |	red up and blue up
6 |	red up and blue down
7 |	red down and blue up
8 |	red down and blue down
9 |	beacon mode on
10 | red up and red down
11 | blue up and blue down

## License

MIT

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/ir-sensor.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ir-sensor
