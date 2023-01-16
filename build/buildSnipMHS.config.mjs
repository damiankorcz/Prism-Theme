import * as esbuild from 'esbuild'
import { sassPlugin } from "esbuild-sass-plugin";
import time from 'esbuild-plugin-time';

/* Assign appropriate paths for the given build type */
const esEntry = `./src/snippets/Prism Mark Highlight System/MHS_index.scss`;
const esOutfile = `./src/snippets/Prism Mark Highlight System.css`;

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
await context.rebuild();
await context.dispose();
