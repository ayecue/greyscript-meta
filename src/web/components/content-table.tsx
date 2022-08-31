import React, { ComponentState, useState } from 'react';
import { Signature } from '../../meta';

export const SCROLL_OFFSET_MEDIA_QUERY = '(min-width: 760px)';
export const DEFAULT_SCROLL_OFFSET = 10;
export const SCROLL_OFFSET_ON_MATCHING_MEDIA_QUERY = 175;

export const scrollTo = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const { matches } = window.matchMedia(SCROLL_OFFSET_MEDIA_QUERY);
    const offset = matches ? DEFAULT_SCROLL_OFFSET : SCROLL_OFFSET_ON_MATCHING_MEDIA_QUERY;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });
};

export interface ContentTableState extends ComponentState {
    signatures: Signature[];
    filter: string;
    onClick: Function;
    hidden?: boolean;
}

function renderSignatures({ signatures, filter, onClick }: ContentTableState) {
    return (
        <ul className='first'>
            {
                signatures.map((item, index) => {
                    let intrinsics = Object.keys(item.definitions).sort();

                    if (filter !== '') {
                        intrinsics = intrinsics.filter((methodName) => {
                            const pattern = new RegExp(filter, 'i');
                            return pattern.test(`${item.type}.${methodName}`);
                        });
                    }

                    if (intrinsics.length === 0) {
                        return;
                    }

                    return (
                        <li key={index}>
                            <a onClick={() => {
                                scrollTo(item.type.toUpperCase());
                                onClick(item.type);
                            }}>{item.type}</a>
                            <ul className='second'>
                                {
                                    intrinsics.map((methodName: string, subIndex: number) => {
                                        const key = `${item.type.toUpperCase()}_${methodName.toUpperCase()}`;
                                        return (
                                            <li key={subIndex}>
                                                <a onClick={() => {
                                                    scrollTo(key);
                                                    onClick(`${item.type}.${methodName}`);
                                                }}>{methodName}</a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default function(state: ContentTableState) {
    const initHidden = state.hidden || true;
    const [hidden, setHidden] = useState<boolean>(initHidden);

    return (
        <div className='content-table'>
            <a className={`collapse material-icons ${!hidden ? 'active' : ''}`} onClick={() => setHidden(hidden ? false : true)}></a>
            <div className={hidden ? 'hidden' : ''}>{renderSignatures(state)}</div>       
        </div>
    );
}