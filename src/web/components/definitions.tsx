import React, { ComponentState, useRef, useEffect } from 'react';
import { Signature, SignatureDefinition, SignatureDefinitionArg } from '../../index';
import { getDescription, getExample } from '../../languages';
import Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import reactStringReplace from 'react-string-replace';

const GREYBEL_UI_URL = 'https://greybel-ui.netlify.app/';

export interface DefinitionsState extends ComponentState {
    signatures: Signature[];
    filter: string;
    monaco: typeof Monaco;
}

function renderEditor(monaco: typeof Monaco, content: string, key: string) {
    const containerRef = useRef(null);
    const url = new URL(GREYBEL_UI_URL);
    url.searchParams.set('c', btoa(content));

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
            <div className={`editor ${key}`} ref={containerRef}></div>
            <a className='run' target='_blank' href={url.toString()}>Run code</a>
        </div>
    )
}

function renderArguments(args: SignatureDefinitionArg[] = []) {
    if (args.length === 0) return;

    return (
        <div className='args'>
            {args.map((item: SignatureDefinitionArg, index: number) => {
                return (
                    <span>
                        <span className='label'>{item.label}</span>: <span className='type'>{item.type}</span>
                        { index < args.length - 1 ? ', ' : '' }
                    </span>
                );
            })}
        </div>
    );
}

function renderReturn(returns: string[]) {
    return (
        <div className='returns'>
            <p>
                {returns.map((item: string, index: number) => {
                    return (
                        <span>
                            <span className='type'>{item}</span>
                            { index < returns.length - 1 ? <span className='or'>or</span> : '' }
                        </span>
                    );
                })}
            </p>
        </div>
    );
}

function renderDescription(description: string) {
    return (
        <p>
            {reactStringReplace(description, /`([^`]+)`/, (match, i) => {
                return <span className='highlight'>{match}</span>
            })}
        </p>
    );
}

function renderDefinition(type: string, methodName: string, definition: SignatureDefinition, monaco: typeof Monaco) {
    const description = getDescription(type, methodName);
    const example = getExample(type, methodName);
    const key = `${type.toUpperCase()}_${methodName.toUpperCase()}`;

    return (
        <article className='definition'>
            <h3 id={key}>{methodName}</h3>
            <ul>
                <li className='labels'>
                    <ul>
                        <li className='signature-label'>Signature:</li>
                        {description ? <li className='description-label'>Description:</li> : null }
                        {example ? <li className='example-label'>Example:</li> : null }
                    </ul>
                </li>
                <li className='meta'>
                    <ul>
                        <li className='signature'>({renderArguments(definition.arguments)}): {renderReturn(definition.returns)}</li>
                        {description ? <li className='description'>{renderDescription(description)}</li> : null}
                        {example ? <li className='example'>{renderEditor(monaco, example.join('\n'), key)}</li> : null}
                    </ul>
                </li>
            </ul>
        </article>
    );
}

function renderDefinitions({ signatures, filter, monaco }: DefinitionsState) {
    const pattern = filter ? new RegExp(filter, 'i') : null;
    const items = signatures.map((item, index) => {
        let visibleItems = 0;
        const intrinsics = Object.entries(item.definitions);
        const items = intrinsics.map(([methodName, definition], subIndex: number) => {
            const isHidden = pattern && !pattern.test(`${item.type}.${methodName}`);

            if (!isHidden) {
                visibleItems++;
            }

            return (
                <li key={subIndex} className={isHidden ? 'hidden' : ''}>
                    {renderDefinition(item.type, methodName, definition, monaco)}
                </li>
            );
        });

        return (
            <li className={visibleItems === 0 ? 'hidden' : ''} key={index}>
                <h2 id={item.type.toUpperCase()}>{item.type}</h2>
                <ul className='second'>
                    {items}
                </ul>
            </li>
        );
    });

    return (
        <ul className='first'>
            {items}
        </ul>
    );
};

export default function(state: DefinitionsState) {
    return (
        <div className='definitions'>
            {renderDefinitions(state)}        
        </div>
    );
}