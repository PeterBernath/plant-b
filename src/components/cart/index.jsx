import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class CartWindow extends React.Component {
  render() {
    const modalVisible = { display: 'block' };
    const modalHidden = { display: 'none' };
    return (
      <div id="myModal" className="modal" style={this.props.modalVisible ? modalVisible : modalHidden}>

        <div className="modal-content">
          <span className="register-header">Kosár tartalma</span>
          <span className="close" onClick={this.props.closeFunc}>&times;</span>
          <div className="cart-items">
            <ul>
            {this.props.cart.map(item => (
              <li>{item}</li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

CartWindow.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};

export default CartWindow;
