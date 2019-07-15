import React from 'react';
const bcrypt = require('bcryptjs');
import PropTypes from 'prop-types';
import './style.less';


const saltRounds = 10;


class RegisterWindow extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let password = data.get('password');

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (hashErr, hash) => {
        return hash;
      });
    });

    password = bcrypt.genSalt();

    const userData = { username: data.get('username'), password };
    console.log(userData);

    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  }

  render() {
    return (
      <div className="register-window">
        <form onSubmit={this.handleSubmit}>
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

export default RegisterWindow;
