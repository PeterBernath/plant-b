import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Modal extends React.Component {

  addToCartLocal = (heading, price, extras, e) => {
    this.props.handlerFunc(heading, price, extras, e);
    this.props.closeFunc();
  }

  render() {
    const modalVisible = { display: 'block' };
    const modalHidden = { display: 'none' };
    const {
      item
    } = this.props;
    console.log(item.extras_keys);
    return (
      <div id="myModal" className="modal" style={this.props.modalVisible ? modalVisible : modalHidden}>
        <div className="modal-content">
          <span className="close" onClick={this.props.closeFunc}>&times;</span>
          <div className="modal_header">Válaszd ki a feltéteket</div>
          <div className="extras_container">
          <form className="form cf" onSubmit={(e) => this.addToCartLocal(item.heading, item.price, item.extras_keys, e)}>
            <section className="plan cf">
              <input type="checkbox" name={item.extras_keys[0]} id="extra_1" value={item.extras_keys[0]}/><label className="extra1" htmlFor="extra_1">{item.extras_keys[0]}</label>
              {1 < item.extras_keys.length ? (
                <div>
                  <input type="checkbox" name={item.extras_keys[1]} id="extra_2" value={item.extras_keys[1]}/>
                  <label className="extra1" htmlFor="extra_2">{item.extras_keys[1]}</label>
                </div>) : (<div className="placeholder"></div>)
              }
              {2 < item.extras_keys.length ? (
                <div>
                  <input type="checkbox" name={item.extras_keys[2]} id="extra_3" value={item.extras_keys[2]}/>
                  <label className="extra1" htmlFor="extra_3">{item.extras_keys[2]}</label>
                </div>) : (<div className="placeholder"></div>)
              }
            </section>
            <section className="plan cf">
            {3 < item.extras_keys.length ? (
              <div>
                <input type="checkbox" name={item.extras_keys[3]} id="extra_4" value={item.extras_keys[3]}/>
                <label className="extra2" htmlFor="extra_4">{item.extras_keys[3]}</label>
              </div>) : (<div className="placeholder_2"></div>)
            }
            </section>
            <input className="msubmit_button" type="submit" value="Kosárba"/>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  item: PropTypes.object,
  handlerFunc: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};


export default Modal;
