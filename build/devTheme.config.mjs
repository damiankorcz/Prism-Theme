import * as esbuild from 'esbuild'
import { config } from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";
import time from 'esbuild-plugin-time';

config();

const outdirVault = process.env.OUTDIR;

/* Assign appropriate paths for the given build type */
const esEntry = `./src/scss/index.scss`;
const esOutfile = `${outdirVault}themes/PrismDev.css`;

const context = await esbuild.context({
    /* Entry point is the file where all imports are */
    entryPoints: [esEntry],
    logLevel: "info",
    outfile: esOutfile,
    // minify: true,
    plugins: [
        sassPlugin({
            cache: true,
            charset: false,
            alertColor: true,
            alertAscii: true,
        }),
        time()
    ]
})
await context.watch();