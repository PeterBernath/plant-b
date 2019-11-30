import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class CartWindow extends React.Component {
  render() {
    const modalVisible = { display: 'block' };
    const modalHidden = { display: 'none' };
    return (
      <div id="myModal" className="modal" style={this.props.modalVisible ? modalVisible : modalHidden}>

        <div className="cart-modal-content">
          <div className="cart-modal-header">
            <span className="cart-heading">Kosár tartalma</span>
            <span className="close" onClick={this.props.closeFunc}>&times;</span>
          </div>
          <div className="cart-body">
            <table className="cart-table">
              <thead>
                <th className="table-cell left">Termék</th>
                <th className="table-cell right">Feltétek</th>
                <th className="table-cell right">Mennyiség</th>
                <th className="table-cell right">Ár</th>
              </thead>
            </table>
            <div className="cart_table_container">
              <table className="cart-table">
                <tbody>
                  {Object.entries(this.props.cart).map(([key, value]) => (
                    <tr>
                      <td className="table-cell left">{key}</td>
                      {undefined === value.extras ? (
                        <td className="table-cell left">-</td>
                      ) : (
                        <td className="small">{value.extras.map((item) => (<p>{0 === item.length ? '-' : item.join(', ')}</p>))}</td>
                      )}
                      <td className="table-cell right">{value.amount}</td>
                      <td className="table-cell right">{value.price} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <table className="total-table">
            <tr>
                  <td className="table-cell left">Végösszeg</td>
                  <td className="table-cell right"></td>
                  <td className="table-cell right">{this.props.cartTotal} €</td>
                </tr>
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
  cartTotal: PropTypes.number.isRequired,
};

export default CartWindow;
