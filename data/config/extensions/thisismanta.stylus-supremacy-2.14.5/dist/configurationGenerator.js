"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Cheerio = require("cheerio");
const stylus_supremacy_1 = require("stylus-supremacy");
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
packageJson.contributes.configuration.properties = Object.keys(stylus_supremacy_1.schema)
    .filter(name => stylus_supremacy_1.schema[name].hideInVSCE !== true)
    .map(name => {
    const item = Object.assign({}, stylus_supremacy_1.schema[name]);
    const $description = Cheerio.load('<p>' + item.description + '</p>').root();
    $description.find('.no-vsce').remove();
    item.description = $description.text().trim();
    delete item.example;
    delete item.hideInDemo;
    return [name, item];
})
    .reduce((hash, pair) => {
    hash['stylusSupremacy.' + pair[0]] = pair[1];
    return hash;
}, {});
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '\t'));
//# sourceMappingURL=configurationGenerator.js.map