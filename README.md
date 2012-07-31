# speedsnitch

simple lightweight nodejs profiling tool

## Getting Started
Install the module with: `npm install speedsnitch`

```javascript
var Snitch = require('speedsnitch');
var snitch = new Snitch(); // "awesome"



snitch.next('lets see how fast some code runs');
/*some code*/

snitch.next('testing some other code');
/*some other code*/

snitch.stop();
/* break */


snitch.next('lets test last bit of code');
/*last bit of code code*/


console.log(snitch.summarize());
//gives you array of json objects with time in ms, description and line numbers, ordered by most expensive bit of code

```

## Documentation
there's not much else to it really!

## License
Copyright (c) 2012 Alan Clarke  
Licensed under the MIT license.
