import React, { ComponentState } from 'react';
import { Signature } from '../../meta';

export interface ContentTableState extends ComponentState {
    signatures: Signature[];
    filter: string;
}

function renderSignatures({ signatures, filter }: ContentTableState) {
    return (
        <ul className='first'>
            {
                signatures.map((item, index) => {
                    let intrinsics = Object.keys(item.definitions);

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
                            <a href={`#${item.type.toUpperCase()}`}>{item.type}</a>
                            <ul className='second'>
                                {
                                    intrinsics.map((methodName: string, subIndex: number) => {
                                        const key = `${item.type.toUpperCase()}_${methodName.toUpperCase()}`;
                                        return (
                                            <li key={subIndex}>
                                                <a href={`#${key}`}>{methodName}</a>
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
    return (
        <div className='content-table'>
            {renderSignatures(state)}        
        </div>
    );
}