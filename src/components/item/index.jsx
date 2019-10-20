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
              <input type="checkbox" name="radio1" id="free" value="uborka"/><label class="extra1" for="free">Uborka</label>
              <input type="checkbox" name="radio1" id="basic" value="paradicsom" checked/><label class="extra1" for="basic">Paradicsom</label>
              <input type="checkbox" name="radio1" id="premium" value="salata"/><label class="extra1" for="premium">Saláta</label>
            </section>
            <section className="plan cf">
              <input type="checkbox" name="radio1" id="basic" value="csipos" checked/><label class="extra2" for="basic">Csípős</label>
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
