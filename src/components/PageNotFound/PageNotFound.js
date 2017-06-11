import React, {PureComponent} from 'react';
import {browserHistory} from 'react-router'
import './PageNotFound.css';

class PageNotFound extends PureComponent {
  back() {
    browserHistory.push(`/app`)
  }
  render() {
    return (
      <div>
        <div className="back-button" onClick={this.back}>
          <i className="fa fa-arrow-left fa-2x"></i>
        </div>
        <div className="PageNotFound_caption">
          Page not found
        </div>
      </div>
    )
  }
}

export default PageNotFound;
