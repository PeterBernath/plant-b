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
          <span className="register-header">Regisztráció</span>
          <span className="close" onClick={this.props.closeFunc}>&times;</span>
          <div className="register-form">
            <form onSubmit={this.props.handlerFunc}>
              <div>
                <input className="input-style" id="username" name="username" type="text" placeholder="Felhasználónév"/>
              </div>
              <div>
                <input className="input-style" id="password" name="password" type="password" placeholder="Jelszó"/>
              </div>
              <button className="register-button">Küldés</button>
            </form>
          </div>
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
