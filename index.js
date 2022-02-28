#!/usr/bin/env node

'use strict';

// Hardcoded locations,  would people want to pass these loacations as arguments?  let me know...
const envLocation = './.env'
const destFile = './src/initEnv.js'

// ----------------------------------------------------------------------------------------------
const run = async () => {

const {buildInitEnv, setWatch} = await import('./watch-env.mjs');


buildInitEnv(envLocation, destFile);

const myArgs = process.argv.slice(2)
if (myArgs.length == 0) {
    console.log(`${envLocation} ===>>>  ${destFile} `);
    process.exit(0)
}

if (myArgs[0] === '--watch') {

    setWatch(envLocation, destFile)

} else {
    console.log('');
    console.log('Help for watch-env.js');
    console.log('  1. run in the background and watch for ./.env file to change:');
    console.log('     node watch-env.js --watch &');
    console.log('');
    console.log('  2. run once:');
    console.log('     node watch-env.js');
}
}

run()