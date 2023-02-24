import fs from "fs";
import sass from "sass";

const inputPath = `./src/snippets/Prism Mark Highlight System/MHS_index.scss`;
const outputPath = `./src/snippets/Prism Mark Highlight System.css`;

const result = sass.compile(inputPath, {
    charset: false,
    sourceMap: false
});

fs.writeFile(outputPath, result.css, () => true);
