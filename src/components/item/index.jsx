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
          <form className="form cf">
            <section className="plan cf">
              <input type="checkbox" name="radio1" id="free" value="free"/><label for="free">Free</label>
              <input type="checkbox" name="radio1" id="basic" value="basic" checked/><label for="basic">Basic</label>
              <input type="checkbox" name="radio1" id="premium" value="premium"/><label for="premium">Premium</label>
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
