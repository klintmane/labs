# dysfun
*Small (dys)functional Javascript library*

> This is _not_ something you would use in production, hence the name __dysfun__. It is a tool for exploring and demonstrating concepts and functions present in the functional programming paradigm.

## Source
Source files for this library are located under __/src__.

## Using
The compiled library __dysfun.js__ is located under __/dist__.

You can easily import it with `import * as dysfun from "(some_path)/dysfun.js";`.

## Building
If you want to build the library on your own, you can use the npm script `npm run distribute` or the `make` command.
> __Note:__ For building using the above, the `make` utility needs to be available on your OS.

## Documentation

### Online Docs
You can check the [online docs](http://klintm.com/dysfun/) for reference or to see this repo's contents in action.

### DIY?
The code under __/src__ uses [JSDoc](http://usejsdoc.org/) annotations.
You can use any Javascript documentation library that supports JSDoc syntax
in order to build the documentation on your own.

An example using [documentation.js](https://github.com/documentationjs/documentation) would be:

`documentation build src/** -f html -o docs`
> The code above can also be run by the npm script `npm run documentation`.

## Testing
To be added soon.
