import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class RegisterWindow extends React.Component {
  render() {
    const modalVisible = { display: 'block' };
    const modalHidden = { display: 'none' };
    return (
      <div id="myModal" className="modal" style={this.props.modalVisible ? modalVisible : modalHidden}>

        <div className="modal-content">
          <span className="close" onClick={this.props.closeFunc}>&times;</span>
          <form onSubmit={this.props.handlerFunc}>
            <label htmlFor="username">Felhasználónév</label>
            <input id="username" name="username" type="text" />

            <label htmlFor="password">Jelszó</label>
            <input id="password" name="password" type="password" />

            <button>Send data!</button>
          </form>
        </div>
      </div>
    );
  }
}

RegisterWindow.propTypes = {
  handlerFunc: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};


export default RegisterWindow;
