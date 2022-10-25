#!/usr/bin/env node

'use strict';

const defaults = { env: './.env', dest: './src/initEnv.js' }

const fs = require('fs');
var argv = require('yargs/yargs')(process.argv.slice(2))
      .usage(`Usage: $0   --env \'${defaults.env}\'   --dest \'${defaults.dest}\'   --watch `)
      .example('$0 --watch &', `run in the background and everytime .env file changes generate a new ${defaults.dest}`)
      .default(defaults)
      .argv;


// ----------------------------------------------------------------------------------------------
const help = () => {
    console.log('                                                                              ')
    console.log('Help:                                                                         ')
    console.log('                                                                              ')
    console.log(' Options:  --watch, --env, --dest                                             ')
    console.log('                                                                              ')
    console.log('  --watch                                                                     ')
    console.log('      run in the background and watch for ./.env file to change               ')
    console.log('      npx watch-env --watch &                                                 ')
    console.log('      default: (no --watch) only run once                                     ')
    console.log('                                                                              ')
    console.log('  --env ../.env                                                               ')
    console.log('      run once with different location for .env file                          ')
    console.log('      default:  ./.env                                                        ')
    console.log('                                                                              ')
    console.log('  --dest ../src/initEnv.js                                                    ')
    console.log('      run once with different location for destination file                   ')
    console.log('      default:  ./src/initEnv.js                                              ')
    console.log('                                                                              ')
}

// ----------------------------------------------------------------------------------------------
const run = async () => {

    const {buildInitEnv, setWatch} = await import('./watch-env.mjs');

    const destFile = argv.dest
    let envFile  = argv.env
    
    if (!fs.existsSync(envFile)) {
        const found = ['./', '../', '../../'].find(path => fs.existsSync(path+'.env')) + '.env'
        console.log(envFile, 'missing ===> using:', found);
        envFile = found
    }

    buildInitEnv(envFile, destFile);

    if (argv.watch) {

        buildInitEnv(envFile, destFile);
        setWatch(envFile, destFile)

    } else {
        console.log(`${envFile} ===>>>  ${destFile} `);
        process.exit(0)
    }

}


run()