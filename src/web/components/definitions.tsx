import React, { ComponentState, useRef, useEffect } from 'react';
import { Signature, SignatureDefinition, SignatureDefinitionArg } from '../../meta';
import { getDescription, getExample } from '../../languages';
import Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import reactStringReplace from 'react-string-replace';
import Editor from './editor';

export interface DefinitionsState extends ComponentState {
    signatures: Signature[];
    filter: string;
    monaco: typeof Monaco;
}

function renderArguments(args: SignatureDefinitionArg[] = []) {
    if (args.length === 0) return;

    return (
        <div className='args'>
            {args.map((item: SignatureDefinitionArg, index: number) => {
                return (
                    <span key={index}>
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
                    const [type, subType] = item.split(':');

                    return (
                        <span key={index}>
                            <span className='type'>{subType ? `${type}<${subType}>` : type}</span>
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
            {reactStringReplace(description, /(`[^`]+`|"[^"]+")/g, (match, index) => {
                if (match.startsWith('"')) {
                    return <span key={index} className='highlight string'>{match}</span>;
                }

                return <span key={index} className='highlight type'>{match.slice(1, -1)}</span>;
            })}
        </p>
    );
}

function shareLink(type: string, methodName: string) {
    const url = new URL(location.href);
    url.searchParams.set('filter', `${type}.${methodName}`);

    navigator.clipboard.writeText(url.toString());
}

function renderDefinition(type: string, methodName: string, definition: SignatureDefinition, monaco: typeof Monaco) {
    const description = getDescription(type, methodName);
    const example = getExample(type, methodName);
    const key = `${type.toUpperCase()}_${methodName.toUpperCase()}`;

    return (
        <article className='definition'>
            <h3 id={key}>{methodName}</h3>
            <a className='share' onClick={() => shareLink(type, methodName)}>copy</a>
            <table>
                <tbody>
                    <tr>
                        <td className='signature label'>Signature:</td>
                        <td className='signature'>({renderArguments(definition.arguments)}): {renderReturn(definition.returns)}</td>
                    </tr>
                    {description ? (
                        <tr>
                            <td className='description label'>Description:</td>
                            <td className='description'>{renderDescription(description)}</td>
                        </tr>
                    ) : null }
                    {example ? (
                        <tr>
                            <td className='example label'>Example:</td>
                            <td className='example'><Editor monaco={monaco} content={example.join('\n')} name={key} /></td>
                        </tr>
                    ) : null }
                </tbody>
            </table>
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