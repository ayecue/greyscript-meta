const lang = require('../assets/grey-texts/EnglishLang.json').content;

const fs = require('fs');
const path = require('path');

//regex pattern
const BLOCK_PATTERN_DESCRIPTOR_START = '<mark=#00D0124D><b>';
const BLOCK_PATTERN_DESCRIPTOR = '\\[[^\\]]+\\]';
const BLOCK_PATTERN_DESCRIPTOR_WITH_VAR = '\\[([^\\]]+)\\]'
const BLOCK_PATTERN_DESCRIPTOR_END = '</b></mark>';

const CODE_BLOCK_START = '<font="SourceCodePro-Regular SDF">\\n?';
const CODE_BLOCK_END = '\\n?</font>';

const BLOCK_PATTERN = new RegExp(`${BLOCK_PATTERN_DESCRIPTOR_START}${BLOCK_PATTERN_DESCRIPTOR}${BLOCK_PATTERN_DESCRIPTOR_END}([\\s\\S]*?)((?=${BLOCK_PATTERN_DESCRIPTOR_START})|$)`, 'g');
const DESCRIPTOR_PATTERN = new RegExp(`${BLOCK_PATTERN_DESCRIPTOR_START}${BLOCK_PATTERN_DESCRIPTOR_WITH_VAR}${BLOCK_PATTERN_DESCRIPTOR_END}`);

const CODE_PATTERN = new RegExp(`${CODE_BLOCK_START}\\s*?([\\s\\S]*?)\\s*?${CODE_BLOCK_END}`, 'g');

const getMetaInfo = (description) => {
    const segments = description.match(BLOCK_PATTERN);
    const meta = segments.reduce((result, item) => {
        const metaKey = (item.match(DESCRIPTOR_PATTERN).pop() || '').toLowerCase();
        let value = item;
        
        switch (metaKey) {
            case 'example':
                value = item
                    .replace(DESCRIPTOR_PATTERN, '')
                    .replace(CODE_PATTERN, '$1')
                    .replace(/#output[\s\S]*$/i, '')
                    .replace(/<\/?[^>]+>/g, '')
                    .replace(/^[\s\n\r]*/, '')
                    .replace(/[\s\n\r]*$/, '')
                    .split('\n');
                
                break;
            default:
                value = item
                    .replace(DESCRIPTOR_PATTERN, '')
                    .replace(/\n/g, ' ')
                    .replace(/<color=yellow>([^>]+)<\/color>/g, '"$1"')
                    .replace(/<\/?[^>]+>/g, '`')
                    .trim();

                if (value[value.length - 1] !== '.') {
                    value += '.';
                }
        }

        return {
            ...result,
            [metaKey]: value
        }
    }, {});

    return meta;
}

const getBasicsInfo = (description) => {
    const segments = description.match(BLOCK_PATTERN);
    const meta = segments.reduce((result, item) => {
        const metaKey = (item.match(DESCRIPTOR_PATTERN).pop() || '')
            .replace(/<\/?[^>]+>/g, '')
            .replace(/^:|:$/g, '')
            .trim();
        const value = item
            .replace(DESCRIPTOR_PATTERN, '')
            .replace(CODE_PATTERN, '[code]$1[/code]')
            .replace(/<\/?[^>]+>/g, '`')
            .trim();

        return {
            ...result,
            [metaKey]: value
        }
    }, {});

    return meta;
}

//collect translations
const BASICS_KEY = 'DOC_BASICS';

const convertKey = (key) => {
    switch (key) {
        case 'DOC_SHELL_PUT':
            return 'DOC_FTPSHELL_PUT';
        default:
            return key;
    }
}

const getUpdatedTranslations = (existingJSON) => {
    const outputJSON = {};

    existingJSON = existingJSON || {};

    //get api descriptions
    Object.keys(lang).filter((item) => {
        return item !== BASICS_KEY && item.startsWith('DOC');
    }).forEach((key) => {
        const description = lang[key];
        const actualKey = convertKey(key);
        const exampleKey = `${actualKey}_EXAMPLE`; 
        const meta = getMetaInfo(description);
    
        if (existingJSON[actualKey] !== meta.description) {
            outputJSON[actualKey] = meta.description;
            console.log(`Found change in "${actualKey}".`);
        }

        if (existingJSON[exampleKey]?.toString() !== meta.example?.toString()) {
            outputJSON[exampleKey] = meta.example;
            console.log(`Found change in "${exampleKey}".`);
        }
    });

    //get basics
    outputJSON[BASICS_KEY] = getBasicsInfo(lang[BASICS_KEY]);

    return outputJSON;
};

const writeTranslations = () => {
    const filepath = path.resolve(__dirname, '../src/languages/en.json');
    const existingJSON = JSON.parse(fs.readFileSync(filepath));
    const output = getUpdatedTranslations(existingJSON);

    if (Object.keys(output).length === 0) {
        console.log(`Nothing to update in translations!`);
        return;
    }
    
    //todo: add support for more files; as soon as there are more translations
    fs.writeFileSync(filepath, JSON.stringify({
        ...existingJSON,
        ...output
    }, null, 4));
    console.log(`Updating of translations was successful!`);
};

//exec
writeTranslations();