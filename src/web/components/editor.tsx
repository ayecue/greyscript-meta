import React, { ComponentState, useRef, useEffect, useState } from 'react';
import Monaco, { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { useInViewport } from 'react-in-viewport';
import useWindowSize from '../utils/resize';

const GREYBEL_UI_URL = 'https://editor.greyscript.org';

export interface EditorState extends ComponentState {
    content: string;
    monaco: typeof Monaco;
    name?: string;
    onClick: Function;
    rerenderDelay?: number;
    componentHeight?: number;
    getDimensions: () => { width: number, height: number }
}

export default function({ monaco, content, name, onClick, rerenderDelay = 500, getDimensions }: EditorState) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, height] = useWindowSize();
    const [visited, setVisited] = useState(false);
    const [visible, setVisible] = useState(false);
    const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor>(null)
    const [rerenderTimer, setRerenderTimer] = useState<NodeJS.Timeout>(null);
    const url = new URL(GREYBEL_UI_URL);
    const encoded = encodeURIComponent(content);
    url.searchParams.set('c', btoa(encoded));

    useInViewport(
        containerRef,
        {},
        { disconnectOnLeave: false },
        { onEnterViewport: () => setVisible(true), onLeaveViewport: () => setVisible(false), }
    );

    useEffect(() => {
        if (visible) {
            if (!visited) {
                const editorModel = monaco.editor.createModel(content, 'greyscript');
                const newEditorInstance = monaco.editor.create(containerRef.current, {
                    model: editorModel,
                    theme: 'vs-dark',
                    readOnly: true,
                    automaticLayout: false,
                    minimap: {
                        enabled: false
                    },
                    wordWrap: 'on',
                    scrollBeyondLastLine: false
                });

                setEditorInstance(newEditorInstance);
                setVisited(true);
            }
        }
    }, [visible]);

    useEffect(() => {
        if (!visible || !editorInstance) return;

        if (rerenderTimer != null) {
            clearTimeout(rerenderTimer);
            setRerenderTimer(null);
        }

        const rerender = () => {
            const firstDefinitionItem = document.querySelector('.second .definition');
            const width = firstDefinitionItem.clientWidth;

            setRerenderTimer(null);
            editorInstance.layout(getDimensions());
        };

        setRerenderTimer(setTimeout(rerender, rerenderDelay));
    }, [visible, width, editorInstance]);

    return (
        <div className='editorWrapper' ref={wrapperRef}>
            <div className={`editor ${name}`} ref={containerRef}></div>
            <a className='run material-icons' target='_blank' href={url.toString()} onClick={() => onClick(content, name)}></a>
        </div>
    )
}