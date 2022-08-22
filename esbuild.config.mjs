/**
 * On recommendation from @valentine195.
 * Config based on @jdanielmourao's Sanctum theme esbuild setup.
 * (https://github.com/jdanielmourao/obsidian-sanctum)
 */

import esbuild from "esbuild";
import process from "process";
import { config } from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";
import time from 'esbuild-plugin-time';
import { readFileSync } from "fs";

config();

/** Path for final file */
const fileDev = `./theme.css`;

/** Reading in text files to be added into the banner/footer */
 const license = readFileSync("./src/scss/Info/license.scss", "utf8");
 const styleSettings = readFileSync("./src/scss/Info/styleSettingsConfig.scss", "utf8");
 const hub = readFileSync("./src/scss/Info/pluginCompatibility.scss", "utf8");

esbuild.build({
    /** Entry point should be where everything is imported into. */
    entryPoints: ["src/scss/index.scss"],

    /** Banner places the content at the beginning of the bundled file. */
    banner: {
        css: license
    },

    /** Footer places the content at the end of the bundled file. */
    footer: {
        css: styleSettings + hub
    },

    /** npm run dev will watch for file changes and rebuild instantly. */
    watch: true,
    logLevel: "info",
    minify: false,
    outfile: fileDev,
    plugins: [
        sassPlugin(),
        time()
    ]
  })
  .catch(() => process.exit(1));
