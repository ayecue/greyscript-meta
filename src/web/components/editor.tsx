import React, { useRef, useState } from 'react';
import { useInViewport } from 'react-in-viewport';

import { HighlightBlock } from './highlight';

const GREYBEL_UI_URL = 'https://editor.greyscript.org';

export interface EditorProps {
  content: string;
  name?: string;
  onClick?: (content: string, name: string) => void;
}

export default function ({ content, name, onClick }: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const url = new URL(GREYBEL_UI_URL);
  const [visible, setVisible] = useState<boolean>(false);
  const encoded = encodeURIComponent(content);
  url.searchParams.set('c', btoa(encoded));

  useInViewport(
    ref,
    {},
    { disconnectOnLeave: false },
    {
      onEnterViewport: () => setVisible(true)
    }
  );

  return (
    <div className="editorWrapper" ref={ref}>
      {visible ? (
        <HighlightBlock className={`editor ${name}`}>{content}</HighlightBlock>
      ) : (
        <pre className={`editor ${name}`}>{content}</pre>
      )}
      <a
        className="run material-icons"
        target="_blank"
        href={url.toString()}
        onClick={() => onClick(content, name)}
        title="Run code"
        rel="nofollow"
      ></a>
    </div>
  );
}
