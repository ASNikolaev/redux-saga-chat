import React, {PureComponent} from 'react';
import {browserHistory} from 'react-router'

import './App.css';
import './font-awesome.css'

class App extends PureComponent {
  changePage = (event) => {
    event.preventDefault();
    let attr = event.target.getAttribute('name');
    if (attr === null) {
      attr = event.target.getAttribute('class');
      if (attr !== null)
        browserHistory.push(`/${attr}`)
    }
    browserHistory.push(`/${attr}`)
  }

  render() {
    return (
      <div className="sign_menu">
        <div className="signin" onClick={this.changePage}>
          <p name="signin" className="signIcon">
            <span name="signin" className="fa fa-sign-in fa-4x"></span><br/>
            <span className="sign_label sign_label_1" name="signin">log in</span>
          </p>
        </div>
        <div className="signup" onClick={this.changePage}>
          <p name="signup" className="signIcon">
            <span name="signup" className="fa fa-user-plus fa-4x"></span><br/>
            <span className="sign_label sign_label_2" name="signup">sign up</span>
          </p>
        </div>
      </div>
    )
  }
}

export default App
