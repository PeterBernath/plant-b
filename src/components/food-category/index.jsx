import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import Item from '../item'


class FoodCategory extends React.Component {
  componentDidMount() {
  }

  render() {
    const {
      items,
      active,
      addToCartFunc,
      addToCartWithExtrasFunc,
      categoryId
    } = this.props;
    return (
      <div className="menu">
        <div className="menu-point">
          <div className="menu-items">
            {items.map((item, index) => (<Item
              image={item.image}
              heading={item.heading}
              desc={item.desc}
              price={item.price}
              active={active}
              addToCartFunc={addToCartFunc}
              addToCartWithExtrasFunc={addToCartWithExtrasFunc}
              categoryId={categoryId}
              itemId={index}
              extras={item.extras}
            />))}
          </div>
        </div>
      </div>
    );
  }
}

FoodCategory.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.bool.isRequired,
  addToCartFunc: PropTypes.func.isRequired,
};

export default FoodCategory;
