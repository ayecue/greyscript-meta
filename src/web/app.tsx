import React, { useState } from 'react';
import language from './grammar/language';
import { signatures } from '../meta';
import ContentTable from './components/content-table';
import Definitions from './components/definitions';
import Basics from './components/basics';
import monacoLoader from '@monaco-editor/loader';

export default function() {
    const urlSearchParams = new URLSearchParams(location.search);
    const filterInit = urlSearchParams.get('filter') || '';
    const [filter, setFilter] = useState(filterInit);
    const [monaco, setMonaco] = useState(null);

    if (monaco === null) {
        monacoLoader.init().then((resolvedMonaco) => {
            resolvedMonaco.languages.register({ id: 'greyscript' });
            resolvedMonaco.languages.setMonarchTokensProvider('greyscript', language);

            setMonaco(resolvedMonaco);
        });

        return <div>Loading</div>
    }

    return (
        <div>
            <input type='text' onChange={(ev) => setFilter(ev.target.value)} value={filter} />
            <ContentTable signatures={signatures} filter={filter} />
            <div className='readme'>
                <h1>GreyScript API (unofficial)</h1>
                <ul>
                    <li><a href="https://github.com/ayecue/greybel-js" target='_blank'>Greybel CLI</a></li>
                    <li><a href="https://github.com/ayecue/greybel-vs" target='_blank'>Greybel VS</a></li>
                </ul>
            </div>
            <Basics monaco={monaco} />
            <Definitions signatures={signatures} filter={filter} monaco={monaco} />
        </div>
    )
}