import React, { useState } from 'react';
import language from './grammar/language';
import { signatures } from '../meta';
import ContentTable from './components/content-table';
import Definitions from './components/definitions';
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
            <div className='navigation'>
                <div className='search'>
                    <input type='text' onChange={(ev) => setFilter(ev.target.value)} value={filter} />
                    { filter.length > 0 ? <span className='clear' onClick={() => setFilter('')}>X</span> : null }
                </div>
                <ContentTable signatures={signatures} filter={filter} onClick={onSidebarClick} />
            </div>
            <div className='content-wrapper'>
                <div className='readme'>
                    <h1>GreyScript API (unofficial)</h1>
                    <ul>
                        {
                            externalLinks.map((externalLink: AppExternalLink, index) => {
                                return (
                                    <li key={index} className='external-links'><a href={externalLink.href} target='_blank'>{externalLink.label}</a></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Definitions signatures={signatures} filter={filter} monaco={monaco} onCodeRunClick={onCodeRunClick} onCopyClick={onCopyClick} />
            </div>
        </div>
    )
}