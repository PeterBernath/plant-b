import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


class Item extends React.Component {
  componentDidMount() {
  }

  render() {
    const {
      image,
      heading,
      desc,
      price,
      active,
      addToCartFunc
    } = this.props;
    return (
      <div className="item">
        <div className="container">
          <h1>Checkout Form</h1>
          <form className="form cf">
            <section className="plan cf">
              <h2>Choose a plan:</h2>
              <input type="radio" name="radio1" id="free" value="free"/><label className="free-label four col" for="free">Free</label>
              <input type="radio" name="radio1" id="basic" value="basic" checked/><label className="basic-label four col" for="basic">Basic</label>
              <input type="radio" name="radio1" id="premium" value="premium"/><label className="premium-label four col" for="premium">Premium</label>
            </section>
            <section className="payment-plan cf">
              <h2>Select a payment plan:</h2>
              <input type="radio" name="radio2" id="monthly" value="monthly" checked/><label className="monthly-label four col" for="monthly">Monthly</label>
              <input type="radio" name="radio2" id="yearly" value="yearly"/><label className="yearly-label four col" for="yearly">Yearly</label>
            </section>
            <section className="payment-type cf">
              <h2>Select a payment type:</h2>
              <input type="radio" name="radio3" id="credit" value="credit"/><label className="credit-label four col" for="credit">Credit Card</label>
              <input type="radio" name="radio3" id="debit" value="debit"/><label className="debit-label four col" for="debit">Debit Card</label>
              <input type="radio" name="radio3" id="paypal" value="paypal" checked/><label className="paypal-label four col" for="paypal">Paypal</label>
            </section>
            <input className="submit" type="submit" value="Submit"/>
          </form>
        </div>
        <div className="image-container">
          <img className="image" src={image} alt="item" />
        </div>
        <div className="item-heading">{heading}</div>
        <div className="item-desc">{desc}</div>
        <div className="item-price">
            {price} €
            {active ? (
              <button onClick={() => addToCartFunc(heading, price)} value={heading} className="add-to-cart">Kosárba</button>
            ) : (
              <div />
            )}
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  image: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  addToCartFunc: PropTypes.func.isRequired,
};

export default Item;
