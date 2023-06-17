import Prism from 'prismjs';
import React, { ComponentProps, useEffect, useRef } from 'react';

import { buildClassName } from '../utils/build-classname';
import { GreyScriptLanguage } from '../utils/grammar';

class PrismGreyScript {
  private prism: typeof Prism;
  private language: string = 'greyscript';

  constructor(prism: typeof Prism) {
    this.prism = prism;
    this.setup();
  }

  getClassName() {
    return `language-${this.language}`;
  }

  setup() {
    if (this.prism) {
      if (this.prism.languages && Prism.languages.greyscript == null) {
        Prism.languages.greyscript = GreyScriptLanguage;
      }
    }
  }
}

const prismGreyScript = new PrismGreyScript(Prism);

export function HighlightBlock(props: ComponentProps<'code'>) {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, [codeRef]);

  return (
    <pre
      className={buildClassName(
        prismGreyScript.getClassName(),
        props.className
      )}
      ref={codeRef}
    >
      {props.children}
    </pre>
  );
}

export function HighlightInline(props: ComponentProps<'code'>) {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, [codeRef]);

  return (
    <code
      className={buildClassName(
        prismGreyScript.getClassName(),
        props.className
      )}
      ref={codeRef}
    >
      {props.children}
    </code>
  );
}
