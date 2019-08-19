import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class RegisterWindow extends React.Component {
  render() {
    return (
      <div className="register-window">
        <form onSubmit={this.props.handlerFunc}>
          <label htmlFor="username">Felhasználónév</label>
          <input id="username" name="username" type="text" />

          <label htmlFor="password">Jelszó</label>
          <input id="password" name="password" type="password" />

          <button>Send data!</button>
        </form>
      </div>
    );
  }
}

RegisterWindow.propTypes = {
  handlerFunc: PropTypes.func.isRequired
};


export default RegisterWindow;
