import React, { ComponentProps, useState } from 'react';
import language from './grammar/language';
import { signatures } from '../meta';
import ContentTable from './components/content-table';
import Definitions from './components/definitions';
import Basics from './components/basics';
import monacoLoader from '@monaco-editor/loader';

export interface AppExternalLink {
    label: string;
    href: string;
}

export interface AppProps {
    externalLinks: AppExternalLink[];
    filterInit: string;
    onSidebarClick?: Function;
    onCodeRunClick?: Function;
    onCopyClick?: Function;
}

function shareLink(type: string, methodName: string) {
    const url = new URL(location.href);
    url.searchParams.set('filter', `${type}.${methodName}`);

    navigator.clipboard.writeText(url.toString());
}

export default function({ filterInit, externalLinks, onSidebarClick = () => {}, onCodeRunClick = () => {}, onCopyClick = () => {} }: AppProps) {
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
            <ContentTable signatures={signatures} filter={filter} onClick={onSidebarClick} />
            <div className='readme'>
                <h1>GreyScript API (unofficial)</h1>
                <ul>
                    {
                        externalLinks.map((externalLink: AppExternalLink, index) => {
                            return (
                                <li key={index}><a href={externalLink.href} target='_blank'>{externalLink.label}</a></li>
                            )
                        })
                    }
                </ul>
            </div>
            <Basics monaco={monaco} onCodeRunClick={onCodeRunClick} />
            <Definitions signatures={signatures} filter={filter} monaco={monaco} onCodeRunClick={onCodeRunClick} onCopyClick={onCopyClick} />
        </div>
    )
}