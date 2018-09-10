# Devil's Playground

A JavaScript idle detection script.

## License

Apache License 2.0 (`apache-2.0`)

## Usage

The constructor takes two parameters:

- function (required) to execute after the number of idle seconds `idleFunction`
- integer (optional) the number of seconds to wait until executing the function `maxNumSeconds`
- object (optional)
	- bool (optional) development mode (display counter and reset calls in JavaScript console

### Public Methods

#### .start()

Start counting idle seconds from zero. You must call this method
to initialize the counter.

#### .stop()

Stop counting idle seconds.

The idleFunction will not be called if the idle dectection has been stopped.

### Examples

#### Minimum Example

The function will be called after 120 seconds (the default).

	var idle = new DevilsPlayground(
		function() {
			console.log('You have been idle for 120 seconds!');
		}
	);
	idle.start();

The function can also be passed in via a variable.

	var youAreIdle = function() {
		console.log('You have been idle for 120 seconds!');
	};

	var idle = new DevilsPlayground(youAreIdle);
	idle.start();

#### Custom Number of Idle Seconds

	var idle = new DevilsPlayground(
		function() {
			console.log('You have been idle for 8 seconds!');
		},
		8
	);
	idle.start();

#### DevMode

When devMode is true, the JavaScript console will show the number of seconds
on the counter and when the reset method is called.

	var idle = new DevilsPlayground(
		function() {
			console.log('You have been idle for 8 seconds!');
		},
		8,
		{ devMode: true }
	);
	idle.start();

## Explanation of the Name

The name of this project is based on the phrase,

> Idle hands are the Devil's Playground

This saying also appears in other forms, e.g.

- Idle hands are the devil's workshop
- Idle hands are the devil's playthings

but the version I grew up hearing was "Devil's Playground".

## Author

[Sal Ferrarello](https://salferrarello.com) / [@salcode](https://twitter.com/salcode)
