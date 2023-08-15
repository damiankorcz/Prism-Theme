import fs from "fs";
import * as sass from 'sass';

const inputPath = "./src/scss/index.scss";
const outputPath = "theme.css";

const result = sass.compile(inputPath, {
    charset: false,
    sourceMap: false
});

fs.writeFile(outputPath, result.css, () => true);