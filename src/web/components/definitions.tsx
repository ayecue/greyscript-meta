import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import { scrollTo } from '../utils/scrollTo';
import Editor from './editor';
import { HighlightInline } from './highlight';
import { Signature, SignatureDefinition, SignatureDefinitionArg } from 'meta-utils';
import { getSiteDescription, greyscriptMeta } from '../../meta';

export interface DefinitionsProps {
  signatures: Signature[];
  filter: string;
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
            return <HighlightInline>{props.children}</HighlightInline>;
          },
          a(props) {
            const href = props.href;

            if (href && href.indexOf('#') !== -1) {
              const item = href.slice(href.indexOf('#') + 1);
              return (
                <a
                  href={props.href}
                  onClick={(ev) => {
                    ev.preventDefault();
                    scrollTo(item);
                    window.history.pushState(null, null, `#${item}`);
                  }}
                  rel="nofollow"
                >
                  {props.children}
                </a>
              );
            }

            return <a href={props.href}>{props.children}</a>;
          }
        }}
      >
        {description}
      </ReactMarkdown>
    </p>
  );
}

interface DefinitionBodyProps {
  description: string;
  example: string[];
  key: string;
  onCodeRunClick: DefinitionsProps['onCodeRunClick'];
}

function DefinitionBody({
  description,
  example,
  key,
  onCodeRunClick
}: DefinitionBodyProps) {
  return (
    <>
      <div className="description">{renderDescription(description)}</div>
      {example ? (
        <div className="example">
          <Editor
            content={example.join('\n')}
            name={key}
            onClick={onCodeRunClick}
          />
        </div>
      ) : null}
    </>
  );
}

interface DefinitionProps {
  type: string;
  methodName: string;
  definition: SignatureDefinition;
  onCodeRunClick: DefinitionsProps['onCodeRunClick'];
  onCopyClick: DefinitionsProps['onCopyClick'];
}

function Definition({
  type,
  methodName,
  definition,
  onCodeRunClick,
  onCopyClick
}: DefinitionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const description = greyscriptMeta.getDescription(type, methodName);
  const example = greyscriptMeta.getExample(type, methodName);
  const key = `${type.toUpperCase()}_${methodName.toUpperCase()}`;

  return (
    <article className="definition" ref={containerRef}>
      <h3 id={key}>
        <span className="name">{methodName}</span>
        <span className="signature">
          ({renderArguments(definition.arguments)}):{' '}
          {renderReturn(definition.returns)}
        </span>
      </h3>
      <a
        className="share"
        onClick={() => onCopyClick(type, methodName)}
        title="Copy link"
        rel="nofollow"
      >
        {getSiteDescription('DEFINITIONS_COPY')}
      </a>
      <DefinitionBody
        description={description}
        example={example}
        key={key}
        onCodeRunClick={onCodeRunClick}
      />
    </article>
  );
}

function renderDefinitions({
  signatures,
  filter,
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
          <Definition
            type={item.type}
            methodName={methodName}
            definition={definition}
            onCodeRunClick={onCodeRunClick}
            onCopyClick={onCopyClick}
          />
        </li>
      );
    });
    const metaDescription = greyscriptMeta.getDescription(item.type, '$meta');
    const metaExample = greyscriptMeta.getExample(item.type, '$meta');
    const isHidden = pattern && !pattern.test(`${item.type}`);

    if (!isHidden) {
      visibleItems++;
    }

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
            content={metaExample.join('\n')}
            name={item.type.toUpperCase()}
            onClick={onCodeRunClick}
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
