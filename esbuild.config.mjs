import esbuild from "esbuild";
import process from "process";
import { config } from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";
import time from 'esbuild-plugin-time';
import { readFileSync } from "fs";

config();

const prod = process.argv[2] === "production";

const dir = prod ? "./" : process.env.OUTDIR;

const fileProd = `${dir}/obsidian.css`;
const fileDev = `${dir}/PrismDev.css`;

/** readFileSync reads the file data in as a string. */
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
    watch: !prod,
    logLevel: "info",
    minify: false,
    outfile: prod ? fileProd : fileDev,
    plugins: [
        sassPlugin(),
        time()
    ]
  })
  .catch(() => process.exit(1));