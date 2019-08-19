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
      heading,
      colorDark,
      colorLight,
      gradient,
      active,
      addToCartFunc
    } = this.props;
    const divStyle = {
      border: `solid 2px ${colorLight}`,
      color: colorLight,
    };
    return (
      <div className="menu">
        <div className="menu-point">
          <div className="menu-header" style={divStyle}>{heading}</div>
          <div className="menu-items">
            {items.map(item => (<Item
              image={item.image}
              heading={item.heading}
              desc={item.desc}
              price={item.price}
              active={active}
              addToCartFunc={addToCartFunc}
            />))}
          </div>
        </div>
      </div>
    );
  }
}

FoodCategory.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  heading: PropTypes.string.isRequired,
  colorDark: PropTypes.string.isRequired,
  colorLight: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  addToCartFunc: PropTypes.func.isRequired,
};

export default FoodCategory;
