import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './web/app';

const root = createRoot(document.querySelector('#root'));
root.render(React.createElement(App));
