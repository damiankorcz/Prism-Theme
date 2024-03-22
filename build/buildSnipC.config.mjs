import fs from "fs";
import sass from "sass";

const inputPath = `./src/snippets/Prism Callouts/C_index.scss`;
const outputPath = `./src/snippets/Prism Callouts.css`;

const result = sass.compile(inputPath, {
    charset: false,
    sourceMap: false
});

fs.writeFile(outputPath, result.css, () => true);
