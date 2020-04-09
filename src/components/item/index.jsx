import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


class Item extends React.Component {
  state = {
    visible: false,
  }

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

  changeVisibility = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  addToCartLocal = (heading, price, extras, e) => {
    this.props.addToCartWithExtrasFunc(heading, price, extras, e);
    this.changeVisibility();
  }

  render() {
    const {
      image,
      heading,
      desc,
      price,
      active,
      addToCartFunc,
      addToCartWithExtrasFunc,
      itemId,
      categoryId,
      extras,
    } = this.props;
    return (
      <div className="item">
        {!this.state.visible | undefined === extras ?
        (
        <div className="image_container">
          <img className="image" src={image} alt="item" />
        </div>
        ) : (
        <div className="extras_container eborder eheight">
          <form className="form cf" onSubmit={(e) => this.addToCartLocal(heading, price, extras, e)}>
            <section className="plan cf">
              <input type="checkbox" name={extras[0]} id={`extra_1_${categoryId}_${itemId}`} value={extras[0]}/><label className="extra1" htmlFor={`extra_1_${categoryId}_${itemId}`}>{extras[0]}</label>
              {1 < extras.length ? (
                <div>
                  <input type="checkbox" name={extras[1]} id={`extra_2_${categoryId}_${itemId}`} value={extras[1]}/>
                  <label className="extra1" htmlFor={`extra_2_${categoryId}_${itemId}`}>{extras[1]}</label>
                </div>) : (<div className="placeholder"></div>)
              }
              {2 < extras.length ? (
                <div>
                  <input type="checkbox" name={extras[2]} id={`extra_3_${categoryId}_${itemId}`} value={extras[2]}/>
                  <label className="extra1" htmlFor={`extra_3_${categoryId}_${itemId}`}>{extras[2]}</label>
                </div>) : (<div className="placeholder"></div>)
              }
            </section>
            <section className="plan cf">
            {3 < extras.length ? (
              <div>
                <input type="checkbox" name={extras[3]} id={`extra_4_${categoryId}_${itemId}`} value={extras[3]}/>
                <label className="extra2" htmlFor={`extra_4_${categoryId}_${itemId}`}>{extras[3]}</label>
              </div>) : (<div className="placeholder_2"></div>)
            }
            </section>
            <input className="submit_button" type="submit" value="Kosárba"/>
          </form>
        </div>
        )}
        <div className="item-heading">{heading}</div>
        {/* <div className="item-desc">{desc}</div> */}
        <div className="item-price">
            {price.toFixed(2)} €
            {!active ? (
              <div />
            ) : undefined === extras ? (
              <button onClick={() => addToCartFunc(heading, price)} value={heading} className="add-to-cart">Kosárba</button>
            ) : (
              <button onClick={() => this.changeVisibility()} value={heading} className="add-to-cart">Feltétek</button>
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
