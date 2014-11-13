## AquaJS Microservice Blueprint Module

This module is a blueprint for a microservice built using AquaJS. Using this blueprint, you can easily create microservices and/or test other modules in the AquaJS framework.

The easiest way to contribute to AquaJS modules is by using [npm-link](https://www.npmjs.org/doc/cli/npm-link.html). npm-link allows you to "trick" npm into using packages located anywhere on your local computer (rather than in node_modules). For example, by npm-linking to the aquajs folder that you cloned from this repo, you can use the package without installing it from the npm registry.

## Setting Up Global npm Links

Before doing anything else, cd into each package folder contained in this repo (i.e, aquajs, aquajs-logger, aquajs-scheduler, etc) and type the following commands:

```
npm link
npm install
```

This will install the package dependencies and create a global symbolic link to the package so that it can be used by other packages without being installed from the registry.

Once global symbolic links exist for all packages, you can test the microservice blueprint module by cding into it and typing:

```
npm link @aqua/aquajs @aqua/aquajs-cli
npm install
```

## Generate the microservice from .yml file
Once you've installed (or npm linked to) your dependencies, cd into the aquajs-microservice folder and enter:

```
aqua scaffold
node server.js
```

## Suggested Reading
To learn more about microservice architecture, see the following articles:

- http://martinfowler.com/articles/microservices.html
- http://microservices.io
