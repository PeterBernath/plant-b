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
          <div className="register-header">Kosár tartalma</div>
          <span className="close" onClick={this.props.closeFunc}>&times;</span>
          <div className="cart-items">
            <table>
              <tr>
                <th>Termék</th>
                <th>Mennyiség</th>
                <th>Ár</th>
              </tr>
            {Object.entries(this.props.cart).map(([key, value]) => (
                <tr>
                  <td>{key}</td>
                  <td>{value.amount}</td>
                  <td>{value.price}</td>
                </tr>
            ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

CartWindow.propTypes = {
  cart: PropTypes.objectOf().isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};

export default CartWindow;
