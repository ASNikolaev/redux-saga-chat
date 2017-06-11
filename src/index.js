import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import Routers from './Routers';

ReactDOM.render(
  <Routers/>, document.getElementById('root'));
