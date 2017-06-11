import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form/immutable'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import './signin.css'

import loginRequest from '../../actions/login'

class Signin extends PureComponent {

  back = () => {
    browserHistory.push(`/app`)
  }

  submit = () => {
    this.props.loginRequest()
  }

  render() {

    const {handleSubmit} = this.props

    return (
      <div className="sign_form">
        <div className="back-button" onClick={this.back}>
          <i className="fa fa-arrow-left fa-2x"></i>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Log in</h1>
          <label htmlFor="login">Login</label><br/>
          <Field name="login" type="text" id="login" className="login" label="Login" component="input"/><br/>
          <label htmlFor="password">Password</label><br/>
          <Field name="password" type="password" id="password" className="password" label="Password" component="input"/><br/>
          <button action="submit">LOG IN</button><br/>
        </form>
      </div>
    )
  }
}

Signin.propTypes = {
  handleSubmit: PropTypes.func,
  loginRequest: PropTypes.func
}

const connected = connect(null, {loginRequest})(Signin)

const formed = reduxForm({form: 'login'})(connected)

export default formed
