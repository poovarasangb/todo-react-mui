import "scss/init.scss";

import { createRoot } from 'react-dom/client';
import React from 'react';

import { App } from './app';

const mainElement = document.createElement('main');
document.body.appendChild(mainElement);
document.title = 'ToDo-React/MUI';

const root = createRoot(mainElement);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
