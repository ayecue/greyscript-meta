import React, { useState } from 'react';
import { scrollTo } from '../utils/scrollTo';
import { Signature } from 'meta-utils';

export interface ContentTableProps {
  signatures: Signature[];
  filter: string;
  onClick: Function;
  hidden?: boolean;
}

function renderSignatures({ signatures, filter, onClick }: ContentTableProps) {
  return (
    <ul className="first">
      {signatures.sort().map((item, index) => {
        const pattern = new RegExp(filter, 'i');
        let intrinsics = Object.keys(item.definitions).sort();

        if (filter !== '') {
          intrinsics = intrinsics.filter((methodName) => {
            return pattern.test(`${item.type}.${methodName}`);
          });
        }

        if (!pattern.test(`${item.type}`) && intrinsics.length === 0) {
          return;
        }

        return (
          <li key={index}>
            <a
              onClick={(ev) => {
                ev.preventDefault();
                scrollTo(item.type.toUpperCase());
                window.history.pushState(
                  null,
                  null,
                  `#${item.type.toUpperCase()}`
                );
                onClick(item.type);
              }}
              rel="nofollow"
            >
              {item.type}
            </a>
            <ul className="second">
              {intrinsics.map((methodName: string, subIndex: number) => {
                const key = `${item.type.toUpperCase()}_${methodName.toUpperCase()}`;
                return (
                  <li key={subIndex}>
                    <a
                      onClick={(ev) => {
                        ev.preventDefault();
                        scrollTo(key);
                        window.history.pushState(null, null, `#${key}`);
                        onClick(`${item.type}.${methodName}`);
                      }}
                      rel="nofollow"
                    >
                      {methodName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default function (props: ContentTableProps) {
  const initHidden = props.hidden || true;
  const [hidden, setHidden] = useState<boolean>(initHidden);

  return (
    <div className="content-table">
      <a
        className={`collapse material-icons ${!hidden ? 'active' : ''}`}
        onClick={() => setHidden(!hidden)}
        rel="nofollow"
      ></a>
      <div className={hidden ? 'hidden' : ''}>{renderSignatures(props)}</div>
    </div>
  );
}
