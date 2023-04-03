import React, { ComponentState, useRef, useEffect } from 'react';
import Monaco from 'monaco-editor/esm/vs/editor/editor.api';

const GREYBEL_UI_URL = 'https://greybel-ui.netlify.app/';

export interface EditorState extends ComponentState {
    content: string;
    monaco: typeof Monaco;
    name?: string;
    onClick: Function;
}

export default function({ monaco, content, name, onClick }: EditorState) {
    const containerRef = useRef(null);
    const url = new URL(GREYBEL_UI_URL);
    const encoded = encodeURIComponent(content);
    url.searchParams.set('c', btoa(encoded));

    useEffect(() => {
        const editorModel = monaco.editor.createModel(content, 'greyscript');

        monaco.editor.create(containerRef.current, {
            model: editorModel,
            theme: 'vs-dark',
            readOnly: true,
            automaticLayout: true,
            minimap: {
                enabled: false
            }
        });
    }, []);

    return (
        <div className='editorWrapper'>
            <div className={`editor ${name}`} ref={containerRef}></div>
            <a className='run' target='_blank' href={url.toString()} onClick={() => onClick(content, name)}>Run code</a>
        </div>
    )
}