import React, { useEffect, useRef, useState } from 'react';

import { getSiteDescription } from '../descriptions';
import { signatures } from '../meta';
import ContentTable from './components/content-table';
import Definitions from './components/definitions';
import { AppExternalLink, ExternalLinks } from './components/external-links';
import { scrollTo } from './utils/scrollTo';

export interface AppProps {
  externalLinks: AppExternalLink[];
  filterInit: string;
  scrollToInit: string;
  onSidebarClick?: Function;
  onCodeRunClick?: (content: string, name: string) => void;
  onCopyClick?: (type: string, methodName: string) => void;
}

export default function ({
  filterInit,
  scrollToInit,
  externalLinks,
  onSidebarClick = () => {},
  onCodeRunClick = () => {},
  onCopyClick = () => {}
}: AppProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState(filterInit);

  useEffect(() => {
    if (rootRef !== null) {
      console.log(scrollToInit);
      scrollTo(scrollToInit);
    }
  }, [rootRef]);

  return (
    <div ref={rootRef}>
      <div className="navigation">
        <div className="search">
          <input
            type="text"
            onChange={(ev) => setFilter(ev.target.value)}
            value={filter}
            aria-label="Search"
          />
          {filter.length > 0 ? (
            <span
              className="clear material-icons"
              onClick={() => setFilter('')}
            ></span>
          ) : null}
        </div>
        <ContentTable
          signatures={signatures}
          filter={filter}
          onClick={onSidebarClick}
        />
      </div>
      <div className="content-wrapper">
        <div className="readme">
          <h1>{getSiteDescription('WELCOME_TITLE')}</h1>
          <article
            dangerouslySetInnerHTML={{
              __html: getSiteDescription('WELCOME_TEXT')
            }}
          ></article>
          <ExternalLinks externalLinks={externalLinks} />
        </div>
        <Definitions
          signatures={signatures}
          filter={filter}
          onCodeRunClick={onCodeRunClick}
          onCopyClick={onCopyClick}
        />
      </div>
    </div>
  );
}
