import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'core-js';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Google Tag Manager init */
import TagManager from 'react-gtm-module';
const tagManagerArgs = {
	gtmId: 'GTM-PDG2FS5'
};
TagManager.initialize(tagManagerArgs);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
