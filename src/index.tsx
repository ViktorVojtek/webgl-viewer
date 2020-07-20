import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './app/components/Canvas';
// import { ContextProvider } from './app/lib/store';
// import MatMenuProvider from './app/lib/context';

const app = <Canvas />;

ReactDOM.render(app, document.getElementById('app'));
