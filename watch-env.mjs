import fs from 'fs'
import dot from 'dotenv'
import { exit } from 'process'
import { scanForSame } from './showOthers.mjs'




// ---------------------------------------------------------------------------
export const buildInitEnv = (envLocation, destFile) => {
    const result = dot.config({ path: envLocation })
    if (result.error) {
        throw result.error
    }

    const data = JSON.stringify(result.parsed, null, 2)
    const setup = `
    const env = ${data}
    
    if (window) {
       window.env = env
    }
    
    if (globalThis) {
       globalThis.env = env
    }
    
    `

    fs.writeFileSync(destFile, setup);
}

// ---------------------------------------------------------------------------
export const setWatch = async (envLocation, destFile) => {

  const all = await scanForSame();
  if (all.length == 1) {
    fs.watchFile(envLocation, (curr, prev) => {
      console.log(`${envLocation} file Changed`);
      buildInitEnv(envLocation, destFile);
    });
  } else {
    console.log("No need to run again with --watch, already watching...");
  }
};

