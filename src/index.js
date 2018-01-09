import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import ToDo from './to-do';
import './index.css';

const app = document.getElementById('app');

ReactDOM.render(
  <BrowserRouter>
    <Route path='/:filter?' component={ToDo}/>
  </BrowserRouter>
, app);
