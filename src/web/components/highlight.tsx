import Prism from 'prismjs';
import React, { ComponentProps, useEffect, useRef } from 'react';

Prism.languages.greyscript = {
  keyword: [
    {
      pattern:
        /\b(if|then|return|end|else|function|and|or|in|not|continue|break|while|for|new|from|isa)\b/
    },
    {
      pattern: /\b#(include|import|envar)\b/
    }
  ],
  function: /function(?=\()/,
  comment: [
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }
  ],
  boolean: /\b(?:false|true)\b/,
  number: {
    pattern: /(?<![\\w\\d.])\\d+(\\.\\d+)?([eE]-?\\d*)?/,
    lookbehind: true
  },
  string: {
    pattern: /"([^"]+("")?)"/,
    greedy: true
  },
  operator: /([+\-*\/\^\&|]|[\<\>\=\!+*\-\/]?\=|\<\<|\>\>\>?)/,
  punctuation: /[\{\}\[\]\(\)]/
};

export function HighlightBlock(props: ComponentProps<'code'>) {
  const codeRef = useRef<HTMLPreElement>(null);
  const classList = props.className?.split(' ') ?? [];

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, [codeRef]);

  return (
    <pre
      className={['language-greyscript', ...classList].join(' ')}
      ref={codeRef}
    >
      {props.children}
    </pre>
  );
}

export function HighlightInline(props: ComponentProps<'code'>) {
  const codeRef = useRef<HTMLPreElement>(null);
  const classList = props.className?.split(' ') ?? [];

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, [codeRef]);

  return (
    <code
      className={['language-greyscript', ...classList].join(' ')}
      ref={codeRef}
    >
      {props.children}
    </code>
  );
}
