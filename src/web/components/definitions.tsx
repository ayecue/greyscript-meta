import Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  getDescription,
  getExample,
  getMetaDescription,
  getMetaExample,
  getSiteDescription
} from '../../descriptions';
import {
  Signature,
  SignatureDefinition,
  SignatureDefinitionArg
} from '../../meta';
import useWindowSize from '../utils/resize';
import Editor from './editor';
import HightlightElement from './hightlight-element';

export interface DefinitionsProps {
  signatures: Signature[];
  filter: string;
  monaco: typeof Monaco;
  onCodeRunClick: (content: string, name: string) => void;
  onCopyClick: (type: string, methodName: string) => void;
}

function renderArgumentLabel(arg: SignatureDefinitionArg) {
  return (
    <span className="label">
      {arg.label}
      {arg.opt ? '?' : ''}
    </span>
  );
}

function renderArgumentDefault(arg: SignatureDefinitionArg) {
  if (arg.default === undefined) return;

  return (
    <span className="default">
      {' '}
      = <span className={arg.type}>{arg.default}</span>
    </span>
  );
}

function renderArguments(args: SignatureDefinitionArg[] = []) {
  if (args.length === 0) return;

  return (
    <div className="args">
      {args.map((item: SignatureDefinitionArg, index: number) => {
        return (
          <span key={index}>
            {renderArgumentLabel(item)}:{' '}
            <span className="type">{item.type}</span>
            {renderArgumentDefault(item)}
            {index < args.length - 1 ? ', ' : ''}
          </span>
        );
      })}
    </div>
  );
}

function renderReturn(returns: string[]) {
  return (
    <div className="returns">
      <p>
        {returns.map((item: string, index: number) => {
          const [type, subType] = item.split(':');

          return (
            <span key={index}>
              <span className="type">
                {subType ? `${type}<${subType}>` : type}
              </span>
              {index < returns.length - 1 ? (
                <span className="or">
                  {getSiteDescription('DEFINITIONS_OR')}
                </span>
              ) : (
                ''
              )}
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
      <ReactMarkdown
        components={{
          code(props) {
            return <HightlightElement>{props.children}</HightlightElement>;
          }
        }}
      >
        {description}
      </ReactMarkdown>
    </p>
  );
}

function renderDefinition(
  type: string,
  methodName: string,
  definition: SignatureDefinition,
  monaco: typeof Monaco,
  onCodeRunClick: DefinitionsProps['onCodeRunClick'],
  onCopyClick: DefinitionsProps['onCopyClick']
) {
  const [width] = useWindowSize();
  const containerRef = useRef<HTMLElement>(null);
  const description = getDescription(type, methodName);
  const example = getExample(type, methodName);
  const key = `${type.toUpperCase()}_${methodName.toUpperCase()}`;

  const getDimensions = useCallback(() => {
    return {
      width: containerRef.current.clientWidth - 110,
      height: 100
    };
  }, [containerRef]);

  return useMemo(
    () => (
      <article className="definition" ref={containerRef}>
        <h3 id={key}>
          <span className="name">{methodName}</span>
          <span className="signature">
            ({renderArguments(definition.arguments)}):{' '}
            {renderReturn(definition.returns)}
          </span>
        </h3>
        <a className="share" onClick={() => onCopyClick(type, methodName)}>
          {getSiteDescription('DEFINITIONS_COPY')}
        </a>
        <div className="description">{renderDescription(description)}</div>
        {example ? (
          <div className="example">
            <Editor
              monaco={monaco}
              content={example.join('\n')}
              name={key}
              onClick={onCodeRunClick}
              getDimensions={getDimensions}
            />
          </div>
        ) : null}
      </article>
    ),
    [width]
  );
}

function renderDefinitions({
  signatures,
  filter,
  monaco,
  onCodeRunClick,
  onCopyClick
}: DefinitionsProps) {
  const pattern = filter ? new RegExp(filter, 'i') : null;
  const items = signatures.map((item, index) => {
    let visibleItems = 0;
    const containerRef = useRef<HTMLLIElement>(null);
    const intrinsicKeys = Object.keys(item.definitions).sort();
    const items = intrinsicKeys.map((methodName: string, subIndex: number) => {
      const definition = item.definitions[methodName];
      const isHidden = pattern && !pattern.test(`${item.type}.${methodName}`);

      if (!isHidden) {
        visibleItems++;
      }

      return (
        <li key={subIndex} className={isHidden ? 'hidden' : ''}>
          {renderDefinition(
            item.type,
            methodName,
            definition,
            monaco,
            onCodeRunClick,
            onCopyClick
          )}
        </li>
      );
    });
    const metaDescription = getMetaDescription(item.type);
    const metaExample = getMetaExample(item.type);
    const isHidden = pattern && !pattern.test(`${item.type}`);

    if (!isHidden) {
      visibleItems++;
    }

    const getDimensions = useCallback(() => {
      return {
        width: containerRef.current.clientWidth - 10,
        height: 100
      };
    }, [containerRef]);

    return (
      <li
        className={visibleItems === 0 ? 'hidden' : ''}
        key={index}
        ref={containerRef}
      >
        <h2 id={item.type.toUpperCase()}>{item.type}</h2>
        {metaDescription ? renderDescription(metaDescription) : null}
        {metaExample ? (
          <Editor
            monaco={monaco}
            content={metaExample.join('\n')}
            name={item.type.toUpperCase()}
            onClick={onCodeRunClick}
            getDimensions={getDimensions}
          />
        ) : null}
        {items.length > 0 ? <ul className="second">{items}</ul> : null}
      </li>
    );
  });

  return <ul className="first">{items}</ul>;
}

export default function (props: DefinitionsProps) {
  return <div className="definitions">{renderDefinitions(props)}</div>;
}
