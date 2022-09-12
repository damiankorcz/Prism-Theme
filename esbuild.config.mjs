/*
    On recommendation from @valentine195.
    Config based on @jdanielmourao's Sanctum theme esbuild setup.
    (https://github.com/jdanielmourao/obsidian-sanctum)
*/

import esbuild from "esbuild";
import { config } from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";
import time from 'esbuild-plugin-time';

config();

const prod = process.argv[2] === "production";
const dir = prod ? "./" : process.env.OUTDIR;

/** Paths for final file */
const fileProd = `${dir}/theme.css`;
const fileDev = `${dir}/PrismDev.css`;

esbuild.build({
    /** Entry point should be where everything is imported into. */
    entryPoints: ["src/scss/index.scss"],

    /** npm run dev will watch for file changes and rebuild instantly. */
    watch: !prod,
    logLevel: "info",
    outfile: prod ? fileProd : fileDev,
    plugins: [
        sassPlugin({
            cache: true,
            charset: false,
            alertColor: true,
            alertAscii: true
        }),
        time()
    ]
}).catch(() => process.exit(1));