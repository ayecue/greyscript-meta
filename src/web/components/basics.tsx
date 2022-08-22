import React, { ComponentState, useRef, useEffect, useState } from 'react';
import { getDescription, getLanguageFile } from '../../languages';
import Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import reactStringReplace from 'react-string-replace';
import Editor from './editor';

export interface BasicsState extends ComponentState {
    monaco: typeof Monaco;
    hidden?: boolean;
}

function renderBasics({ monaco }: BasicsState) {
    const file = getLanguageFile();
    const basics = file['DOC_BASICS'];
    const items = Object.entries(basics).map(([title, content], index) => {
        return (
            <div className='entry' key={index}>
                <h2>{title}</h2>
                <article>
                    {reactStringReplace(content as string, /(`[^`]+`|\[code\][\s\S]*?\[\/code\])/g, (match, index) => {
                        if (match.startsWith('`')) {
                            return <span key={index} className='highlight string'>{match.slice(1, -1)}</span>;
                        }

                        return <Editor monaco={monaco} content={match.slice(6, -7)} key={index} />;
                    })}
                </article>
            </div>
        )
    });

    return (
        <div className='wrapper'>
            {items}
        </div>
    );
};

export default function(state: BasicsState) {
    const initHidden = state.hidden || true;
    const [hidden, setHidden] = useState<boolean>(initHidden);

    return (
        <div className='basics'>
            <a className='collapse' onClick={() => setHidden(hidden ? false : true)} href='#'>{hidden ? 'Show basics' : 'Hide basics'}</a>
            <div className={hidden ? 'hidden' : ''}>{renderBasics(state)}</div>        
        </div>
    );
}