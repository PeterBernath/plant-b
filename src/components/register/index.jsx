import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


class RegisterWindow extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    console.log(username);

    fetch('/api/register', {
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (
      <div className="register-window">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Felhasználónév</label>
          <input id="username" name="username" type="text" />

          <label htmlFor="email">Jelszó</label>
          <input id="email" name="email" type="password" />

          <button>Send data!</button>
        </form>
      </div>
    );
  }
}

export default RegisterWindow;
