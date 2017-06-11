import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form/immutable'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import './signup.css'

import signupRequest from '../../actions/signup'

class Signup extends PureComponent {

  back = () => {
    browserHistory.push(`/app`)
  }

  submit = () => {
    this.props.signupRequest()
  }

  render() {
    const {handleSubmit} = this.props

    return (
      <div className="sign_form">
        <div className="back-button" onClick={this.back}>
          <i className="fa fa-arrow-left fa-2x"></i>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Sign up</h1>
          <label htmlFor="email">Email</label><br/>
          <Field name="email" type="text" id="email" className="email" label="Email" component="input"/><br/>
          <label htmlFor="login">Login</label><br/>
          <Field name="login" type="text" id="login" className="login" label="Login" component="input"/><br/>
          <label htmlFor="password">Password</label><br/>
          <Field name="password" type="password" id="password" className="password" label="Password" component="input"/><br/>
          <button action="submit">SIGN UP</button><br/>
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func,
  signupRequest: PropTypes.func
}

const connected = connect(null, {signupRequest})(Signup)

const formed = reduxForm({form: 'signup'})(connected)

export default formed;
