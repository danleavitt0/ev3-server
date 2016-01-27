
# ultrasonic-sensor

[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

to interact with the ev3-js ultrasonic sensor

## Installation

    $ npm install ultrasonic-sensor

## Usage

```js
var USSensor = require('ultrasonic-sensor')
USSensor(3).inches // => 5.2
```

## API

### ultrasonicSensor(port)

- `port` -  number of the port that the color sensor is plugged in to.

**Returns:** instance of USSensor

### .inches
Read the number of inches from the ultra-sonic sensor.

### .cm
Read the number of cm from the ultra-sonic sensor.

## License

MIT

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/ultrasonic-sensor.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ultrasonic-sensor
