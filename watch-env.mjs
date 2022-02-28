import fs from 'fs'
import dot from 'dotenv'
import { exit } from 'process'
import { scanForSame } from './showOthers.mjs'

const envLocation = './.env'
const destFile = './src/initEnv.js'

const myArgs = process.argv.slice(2)

// ---------------------------------------------------------------------------
const buildInitEnv = () => {
    const result = dot.config({ path: envLocation })
    if (result.error) {
        throw result.error
    }

    const data = JSON.stringify(result.parsed, null, 2)
    const setup = `
    window.env = ${data}
    `

    fs.writeFileSync(destFile, setup);
}

// ---------------------------------------------------------------------------
const setWatch = async () => {

  const all = await scanForSame();
  if (all.length == 1) {
    fs.watchFile(envLocation, (curr, prev) => {
      console.log(`${envLocation} file Changed`);
      buildInitEnv();
    });
  } else {
    console.log("No need to run again with --watch, already watching...");
  }
};

buildInitEnv();

if (myArgs.length == 0) {
    console.log(`${envLocation} ===>>>  ${destFile} `);
    process.exit(0)
}

if (myArgs[0] === '--watch') {

    setWatch()

} else {
    console.log('');
    console.log('Help for watch-env.js');
    console.log('  1. run in the background and watch for ./.env file to change:');
    console.log('     node watch-env.js --watch &');
    console.log('');
    console.log('  2. run once:');
    console.log('     node watch-env.js');
}