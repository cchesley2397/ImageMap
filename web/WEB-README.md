# Image Map Web Application Configuation and Usage

Commands are assumed to be run from the /ImageMap/web/ directory.



## Running the included webserver

```
node ./js/server.js
```

Navigate to **http://localhost:8080"



## Consolidating Javascript with Webpack

Run:
```
npm run build
```
or,
```
npx webpack
```



## Installing node dependencies
```
npm install
```



## package.json versioning
**package.json** uses [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning)


| CODE STATUS                                     | STAGE         | RULE                | EXAMPLE # |
|-------------------------------------------------|---------------|---------------------|-----------|
| First Release                                   |  New Product  |   Start with 1.0.0  |   1.0.0   |
| Bug fixes, other minor changes                  | Patch Release | Increment 3rd digit |   1.0.1   |
| New features that don't break existing features | Minor Release | Increment 2nd digit |   1.1.0   |
| Changes that break backwards compatibility      | Major Release | Increment 3rd digit |   2.0.0   |


Incrementing version with CLI

```
npm version patch
```
```
npm version minor
```
```
npm version major
```
