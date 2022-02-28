# watch-env 

A utility to convert .env file into ./src/initEnv.js that can be included in your front end code so the back end and front end can share project wide constants.

--------------------------------------------------------------------
## How to use:

run once

```
npx watch-env
```

run in the background watching for changes in .env file and creating ./src/initEnv.js

```
npx watch-env --watch &
```

## Examples of using in you project's package.json:
```
    "prep": "node watch-env.mjs",
    "watch": "node watch-env.mjs --watch &",
    
    "build": "run-s prep webpack"
    "front": "webpack serve",
    "back": "cd server && ./start.sh",

    "start": "run-s watch back front",
    "prod": "run-s build back"
```