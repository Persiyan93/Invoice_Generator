import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');


ReactDOM.render(
    <Router basename={ baseUrl}>
        <App />
    </Router>,
document.getElementById('root')
);