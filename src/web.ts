import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './web/app';

function getFilterValue() {
  const urlSearchParams = new URLSearchParams(location.search);
  return urlSearchParams.get('filter') || '';
}

function getScrollToValue() {
  return location.hash?.slice(1) || '';
}

function shareLink(type: string, methodName: string) {
  const url = new URL(location.href);
  url.searchParams.set('filter', `${type}.${methodName}`);

  navigator.clipboard.writeText(url.toString());
}

const root = createRoot(document.querySelector('#root'));
root.render(
  React.createElement(App, {
    externalLinks: [
      {
        label: 'Greybel CLI',
        href: 'https://github.com/ayecue/greybel-js'
      },
      {
        label: 'Greybel VS',
        href: 'https://github.com/ayecue/greybel-vs'
      },
      {
        label: 'GreyScript Meta',
        href: 'https://github.com/ayecue/greyscript-meta'
      },
      {
        label: 'greyrepo.xyz',
        href: 'https://www.greyrepo.xyz'
      },
      {
        label: 'Grey Hack TUTORIALS',
        href: 'https://www.youtube.com/@Greyhacktutorials'
      },
      {
        label: 'Grey Hack Gaming',
        href: 'https://www.youtube.com/@greyhackgaming'
      }
    ],
    filterInit: getFilterValue(),
    scrollToInit: getScrollToValue(),
    onCopyClick: shareLink
  })
);
