import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


class Item extends React.Component {
  componentDidMount() {
  }

  addExtras = (event, heading, price) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get('extra1'));
    console.log(data.get('extra2'));
    console.log(data.get('extra3'));
    console.log(data.get('extra4'));
    console.log(heading);
    console.log(price);
  };

  render() {
    const {
      image,
      heading,
      desc,
      price,
      active,
      addToCartFunc,
      itemId,
      categoryId
    } = this.props;
    return (
      <div className="item">
        <div className="container">
          <form className="form cf" onSubmit={(e) => this.addExtras(e, heading, price)}>
            <section className="plan cf">
              <input type="checkbox" name="extra1" id={`extra_1_${categoryId}_${itemId}`} value="uborka"/><label className="extra1" htmlFor={`extra_1_${categoryId}_${itemId}`}>Uborka</label>
              <input type="checkbox" name="extra2" id={`extra_2_${categoryId}_${itemId}`} value="paradicsom"/><label className="extra1" htmlFor={`extra_2_${categoryId}_${itemId}`}>Paradicsom</label>
              <input type="checkbox" name="extra3" id={`extra_3_${categoryId}_${itemId}`} value="salata"/><label className="extra1" htmlFor={`extra_3_${categoryId}_${itemId}`}>Saláta</label>
            </section>
            <section className="plan cf">
              <input type="checkbox" name="extra4" id={`extra_4_${categoryId}_${itemId}`} value="csipos"/><label className="extra2" htmlFor={`extra_4_${categoryId}_${itemId}`}>Csípős</label>
            </section>
            <input className="submit_button" type="submit" value="Elküld"/>
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
