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

export interface ExternalLinksProps {
    externalLinks: AppExternalLink[];
    maxLinks?: number;
}

export interface AppProps {
    externalLinks: AppExternalLink[];
    filterInit: string;
    onSidebarClick?: Function;
    onCodeRunClick?: Function;
    onCopyClick?: Function;
}

function ExternalLinks({ externalLinks, maxLinks = 2 }: ExternalLinksProps) {
    if (externalLinks.length <= maxLinks) {
        return <ul>
            {
                externalLinks.map((externalLink: AppExternalLink, index) => {
                    return (
                        <li key={index} className='external-links'><a href={externalLink.href} target='_blank'>{externalLink.label}</a></li>
                    )
                })
            }
        </ul>;
    }

    const [fullView, setFullView] = useState(false);

    if (fullView) {
        return <ul>
            {
                externalLinks.map((externalLink: AppExternalLink, index) => {
                    return (
                        <li key={index} className='external-links'><a href={externalLink.href} target='_blank'>{externalLink.label}</a></li>
                    )
                })
            }
            <li className='collapse' onClick={() => setFullView(false)}>less</li>
        </ul>;
    }

    return <ul>
        {
            externalLinks.slice(0, maxLinks).map((externalLink: AppExternalLink, index) => {
                return (
                    <li key={index} className='external-links'><a href={externalLink.href} target='_blank'>{externalLink.label}</a></li>
                )
            })
        }
        <li className='collapse' onClick={() => setFullView(true)}>more</li>
    </ul>;
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
                    <h1>GreyScript API – Unofficial Documentation</h1>
                    <article>
                        <p>Grey Hack enables players to create their own programs inside the game via the integrated scripting language called GreyScript. GreyScript is a fork of <a href="https://miniscript.org/" target="_blank">MiniScript</a> and can be compared to other language such as JavaScript or Lua.</p>
                        <p>Programs can be created within Grey Hack via the ingame CodeEditor. Alternatively you can also use <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> with <a href="https://marketplace.visualstudio.com/items?itemName=ayecue.greybel-vs" target="_blank">greybel-vs</a> which includes syntax highlighting and other helpful features. Another alternative is to use the <a href="https://greybel-ui.netlify.app/" target="_blank">online editor</a> provided by <a href="https://github.com/ayecue/greybel-js" target="_blank">greybel-js</a>. The latter also provides a CLI which can be used for script execution outside the game and bundling of code files.</p>
                        <p>The best sources for Grey Hack scripts to get inspiration from are <a href="https://www.greyrepo.xyz/" target="_blank">greyrepo.xyz</a> and <a href="https://github.com/search?q=grey+hack" target="_blank">github.com</a>.</p>
                    </article>
                    <ExternalLinks externalLinks={externalLinks} />
                </div>
                <Definitions signatures={signatures} filter={filter} monaco={monaco} onCodeRunClick={onCodeRunClick} onCopyClick={onCopyClick} />
            </div>
        </div>
    )
}