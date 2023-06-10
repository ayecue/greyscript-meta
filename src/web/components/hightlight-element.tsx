import Prism from 'prismjs';
import React, { ComponentProps, useEffect, useMemo, useRef } from 'react';

export default function (props: ComponentProps<'code'>) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, [codeRef]);

  return useMemo(
    () => (
      <code ref={codeRef} className="language-javascript">
        {props.children}
      </code>
    ),
    [codeRef]
  );
}
