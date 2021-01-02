# Overlay

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Build

Run `ng build button-overlay` to build the project. The build artifacts will be stored in the `dist/` directory.


## Packing

Go to the dist folder, access the button-overlay folder and run `npm pack` to pack the project into a .tgz file.

## Running unit tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io) and verify the code coverage.

## Installing the library
To install the library using npm do ```npm install [path/to/.tgz]```.

## Using this library
To use the library first import the **ButtonOverlayModule**.

You can use it including the button and passing the array os strings.
```
<button-overlay [content]="myArrayOfStrings" position="top-right" title="myTitle"></button-overlay>
```

This will create an overlay with the default component and pagination.

To create a custom overlay you need to call the method ```open``` of the **PopoverService**.
> **LIMITATION**: The custom component needs to have an input called values like so:
> 
> ```@Input() values: string[]```
