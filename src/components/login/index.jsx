import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class LoginWindow extends React.Component {

  render() {
    return (
      <div className="login-window">
        <form onSubmit={this.props.handlerFunc}>
          <label htmlFor="username">Felhasználónév</label>
          <input id="username" name="username" type="text" />

          <label htmlFor="password">Jelszó</label>
          <input id="password" name="password" type="password" />

          <button>Log in</button>
        </form>
      </div>
    );
  }
}

LoginWindow.propTypes = {
  handlerFunc: PropTypes.func.isRequired
};

export default LoginWindow;
