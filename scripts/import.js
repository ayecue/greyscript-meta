const fs = require('fs');
const path = require('path');

const lang = require('../assets/grey-texts/EnglishLang.json').content;

//filter all doc keys
const keys = Object.keys(lang).filter((key) => key.startsWith('DOC'));
const outputJSON = {};

const BLOCK_PATTERN_DESCRIPTOR_START = '<mark=#00D0124D><b>';
const BLOCK_PATTERN_DESCRIPTOR = '\\[[^\\]]+\\]';
const BLOCK_PATTERN_DESCRIPTOR_WITH_VAR = '\\[([^\\]]+)\\]'
const BLOCK_PATTERN_DESCRIPTOR_END = '</b></mark>';

const BLOCK_PATTERN = new RegExp(`${BLOCK_PATTERN_DESCRIPTOR_START}${BLOCK_PATTERN_DESCRIPTOR}${BLOCK_PATTERN_DESCRIPTOR_END}([\\s\\S]*?)((?=${BLOCK_PATTERN_DESCRIPTOR_START})|$)`, 'g');
const DESCRIPTOR_PATTERN = new RegExp(`${BLOCK_PATTERN_DESCRIPTOR_START}${BLOCK_PATTERN_DESCRIPTOR_WITH_VAR}${BLOCK_PATTERN_DESCRIPTOR_END}`);

//load exisiting translations
const filepath = path.resolve(__dirname, '../src/languages/en.json');
const existingJSON = JSON.parse(fs.readFileSync(filepath));

keys.forEach((key) => {
    const description = lang[key];
    const segments = description.match(BLOCK_PATTERN);
    const meta = segments.reduce((result, item) => {
        const metaKey = (item.match(DESCRIPTOR_PATTERN).pop() || '').toLowerCase();
        let value = item
            .replace(DESCRIPTOR_PATTERN, '')
            .replace(/\n/g, ' ')
            .replace(/<\/?[^>]+>/g, '`')
            .trim();

        if (value[value.length - 1] !== '.') {
            value += '.';
        }

        return {
            ...result,
            [metaKey]: value
        }
    }, {});

    if (existingJSON[key] !== meta.description) {
        outputJSON[key] = meta.description;
        console.log(`Found change in "${key}".`);
    }
});

if (Object.keys(outputJSON).length === 0) {
    console.log(`Nothing to update!`);
    process.exit(1);
}

const output = JSON.stringify({
    ...existingJSON,
    ...outputJSON
}, null, 4);

//todo: add support for more files; as soon as there are more translations
fs.writeFileSync(filepath, output);

console.log(`Updating was successful!`);