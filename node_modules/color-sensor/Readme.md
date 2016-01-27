
# color-sensor

[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

use the ev3 color sensor

## Installation

    $ npm install ev3-js-color-sensor

## Usage

```js
var ColorSensor = require('color-sensor')
ColorSensor(1).reflected // => 88
ColorSensor(1).color // => 7
```

## API

### ColorSensor(port)

- `port` - number of the port that the color sensor is plugged in to.

**Returns:** instance of ColorSensor

### .reflected
Gets the value of the reflected light intensity.

**Returns:** number between 0 and 100

### .color
Gets the value of the color.

**Returns:** color value between 0 and 7

number | color
---|---
0 | no color
1 | black
2 | blue
3 | green
4 | yellow
5 | red
6 | white
7 | brown

## License

MIT

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/color-sensor.svg?style=flat-square
[npm-url]: https://npmjs.org/package/color-sensor
