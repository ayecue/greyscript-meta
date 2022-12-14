import React, { ComponentState } from 'react';
import { Signature, SignatureDefinition, SignatureDefinitionArg } from '../../meta';
import { getDescription, getExample, getExampleReference } from '../../languages';
import Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import reactStringReplace from 'react-string-replace';
import Editor from './editor';

export interface DefinitionsState extends ComponentState {
    signatures: Signature[];
    filter: string;
    monaco: typeof Monaco;
    onCodeRunClick: Function;
    onCopyClick: Function;
}

function renderArgumentLabel(arg: SignatureDefinitionArg) {
    return <span className='label'>{arg.label}{arg.opt ? '?' : ''}</span>;
}

function renderArgumentDefault(arg: SignatureDefinitionArg) {
    if (arg.default === undefined) return;

    return <span className='default'> = <span className={arg.type}>{arg.default}</span></span>;
}

function renderArguments(args: SignatureDefinitionArg[] = []) {
    if (args.length === 0) return;

    return (
        <div className='args'>
            {args.map((item: SignatureDefinitionArg, index: number) => {
                return (
                    <span key={index}>
                        {renderArgumentLabel(item)}: <span className='type'>{item.type}</span>
                        {renderArgumentDefault(item)}
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

function renderDefinition(type: string, methodName: string, definition: SignatureDefinition, monaco: typeof Monaco, onCodeRunClick: Function, onCopyClick: Function) {
    const description = getDescription(type, methodName);
    const example = getExample(type, methodName);
    const exampleRef = getExampleReference(type, methodName);
    const key = `${type.toUpperCase()}_${methodName.toUpperCase()}`;

    return (
        <article className='definition'>
            <h3 id={key}>{methodName}</h3>
            <a className='share' onClick={() => onCopyClick(type, methodName)}>copy</a>
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
                            <td className='example'>
                                <Editor
                                    monaco={monaco}
                                    content={example.join('\n')}
                                    contentWithRef={exampleRef.concat(example).join('\n')}
                                    name={key}
                                    onClick={onCodeRunClick}
                                />
                            </td>
                        </tr>
                    ) : null }
                </tbody>
            </table>
        </article>
    );
}

function renderDefinitions({ signatures, filter, monaco, onCodeRunClick, onCopyClick }: DefinitionsState) {
    const pattern = filter ? new RegExp(filter, 'i') : null;
    const items = signatures.map((item, index) => {
        let visibleItems = 0;
        const intrinsicKeys = Object.keys(item.definitions).sort();
        const items = intrinsicKeys.map((methodName: string, subIndex: number) => {
            const definition = item.definitions[methodName];
            const isHidden = pattern && !pattern.test(`${item.type}.${methodName}`);

            if (!isHidden) {
                visibleItems++;
            }

            return (
                <li key={subIndex} className={isHidden ? 'hidden' : ''}>
                    {renderDefinition(item.type, methodName, definition, monaco, onCodeRunClick, onCopyClick)}
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