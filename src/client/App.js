import _ from 'lodash';
import React, { Component } from 'react';
import './styles.less';
import PersonPin from '@material-ui/icons/PersonPin';
import Input from '@material-ui/icons/Input';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import logo from '../../public/logo_new.png';
import breakfast from '../../public/breakfast.png';
import taco from '../../public/taco.png';
import cake from '../../public/cake.png';
import smoothie from '../../public/smoothie.png';
import introBackground from '../../public/intro_background.png';
import FoodCategory from '../components/food-category';
import Modal from '../components/modal'
import items from '../data/fixtures';
import { styled } from '@material-ui/styles';
import Swal from 'sweetalert2';
const bcrypt = require('bcryptjs');
const moment = require('moment');
import { DatePicker, TimePicker } from 'antd';
import "antd/dist/antd.css";

const format = 'HH:mm';

const MyPerson = styled(PersonPin)({
  color: 'black',
});

const MyShoppingCart = styled(ShoppingCart)({
  color: 'black',
});

const MyInput = styled(Input)({
  color: 'black',
});

export default class App extends Component {
  state = {
    main: true,
    loggedIn: false,
    cart: JSON.parse(sessionStorage.getItem('cart')) || {},
    username: sessionStorage.getItem('username'),
    view: 'main',
    startDate: new Date(),
    time: '10:00',
    modalVisible: false,
    item: {
      extras_keys: []
    },
  };

  componentDidMount() {
    console.log(this.state);
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  hello = () => {
    const { main } = this.state;
    this.setState({ main: !main });
    fetch('/api/hello')
      .then(res => res.json())
      .then(response => console.log(response));
  };

  register = () => {
    this.setState({ view: "register" });
  };

  showCart = () => {
    this.setState({ view: "cart" });
  };

  login = () => {
    this.setState({ view: "login" });
  };

  logout = () => {
    sessionStorage.removeItem('jwtToken');
    this.setState({ loggedIn: false });
  };

  handleRegistration = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    const password = data.get('password');
    bcrypt.hash(password, 10, (err, hash) => {
      const userData = {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        username: username,
        password: hash
      };
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      .then((res) => res.json())
      .then((json) => {
        if (true === json.success) {
          Swal.fire({text: 'Sikeres regisztráció', icon:'success'})
          this.handleLoginAfterReg(username, password);
        } else {
          Swal.fire({text: 'Ez a felhasználónév már foglalt', icon:'error'})
        }
      })
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: data.get('username'), password: data.get('password') }),
    })
      .then(res => res.json())
      .then((res) => {
        if (true === res.success) {
          console.log(res);
          sessionStorage.setItem('jwtToken', res.token);
          sessionStorage.setItem('username', data.get('username'));
          this.setState({ view: 'main', loggedIn: true, username: data.get('username')});
        } else {
          Swal.fire({text: 'Helytelen felhasználónév vagy jelszó', icon:'error'})
        }
      });
  };

  handleLoginAfterReg = (username, password) => {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then((res) => {
        if (true === res.success) {
          console.log(res);
          sessionStorage.setItem('jwtToken', res.token);
          sessionStorage.setItem('username', username);
          this.setState({ view: 'main', loggedIn: true, username})
        } else {
          Swal.fire({text: 'Hiba történt', icon:'error'});
        }
      });
  };

  handleNewOrder = () => {
    const orderData = {
      username: this.state.username,
      date: new Date(this.state.year, this.state.month, this.state.day, this.state.hours, this.state.minutes),
      cart: this.state.cart
    };
    fetch('/api/new-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
    .then((res) => res.json())
    .then((json) => {
      if (true === json.success) {
        Swal.fire({text: 'Sikeres rendelés', icon:'success'});
        this.clearCart();
        this.setState({
          view: 'main',
          year: undefined,
          month: undefined,
          day: undefined,
          hours: undefined,
          minutes: undefined
        });
      } else {
        Swal.fire({text: 'Hiba történt', icon:'error'})
      }
    })
  };

  addToCartWithExtras = async (item, price, extras_keys, event) => {
    let extras = []
    event.preventDefault();
    const cart = this.state.cart;
    if (undefined !== _.get(cart, `${item}.extras`)) {
      extras = _.get(cart, `${item}.extras`)
    }
    console.log(extras);
    let item_extras = []
    const data = new FormData(event.target);
    for (let extra of extras_keys) {
      if (null !== data.get(extra)) {
        item_extras.push(data.get(extra));
      }
    }
    extras.push(item_extras)
    if (cart[item] === undefined) cart[item] = { amount: 1, price, extras, extras_keys };
    else cart[item] = { amount: cart[item].amount + 1, price, extras, extras_keys };
    await this.setState({ cart });
    console.log(this.state.cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  removeFromCartWithExtras = async (index, item, price, extras) => {
    const cart = this.state.cart;
    if (1 === cart[item].amount) {
      delete cart[item];
    } else {
      cart[item].amount = cart[item].amount - 1;
      cart[item].extras.splice(index, 1);
    }
    await this.setState({ cart });
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  addToCart = async (item, price) => {
    const cart = this.state.cart;
    if (cart[item] === undefined) cart[item] = { amount: 1, price };
    else cart[item] = { amount: cart[item].amount + 1, price };
    await this.setState({ cart });
    console.log(this.state.cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  removeFromCart = async (item, price) => {
    const cart = this.state.cart;
    if (1 === cart[item].amount) delete cart[item];
    else cart[item] = { amount: cart[item].amount - 1, price };
    await this.setState({ cart });
    console.log(this.state.cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  noOfItemsInCart = (cart) => {
    console.log(cart);
    console.log(Object.values(cart));
    let noOfItems = 0;
    Object.values(cart).forEach((item) => {
      console.log(item.amount);
      noOfItems += item.amount;
    });
    console.log(noOfItems);
    return noOfItems;
  };

  calculateTotal = (cart) => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      console.log(item.amount);
      console.log(item.price);
      total += item.amount * item.price;
    });
    console.log(total);
    return total;
  };

  changeView = (view) => {
    this.setState({view});
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleDate = dates => {
    this.setState({
      day: dates._d.getDate(),
      month: dates._d.getMonth(),
      year: dates._d.getFullYear()
    });
  };

  handleTime = time => {
    this.setState({
      hours: time._d.getHours() + (Math.abs(time._d.getTimezoneOffset()) / 60),
      minutes: time._d.getMinutes()
    });
  };

  clearCart = () => {
    this.setState({ cart: {} });
    sessionStorage.removeItem('cart');
  }

  showModalAndSetState = (heading, price, extras_keys) => {
    const item = { heading, price, extras_keys }
    this.setState({ modalVisible: !this.state.modalVisible, item });
  }

  changeModalVisibility = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    return (
      <div>
        <Modal
          item={this.state.item}
          handlerFunc={this.addToCartWithExtras}
          modalVisible={this.state.modalVisible}
          closeFunc={this.changeModalVisibility}
        />
        <div className="main_header">
          {!this.state.loggedIn ? (
            <div>
              <div className="login" onClick={() => this.login()}>
                <span className="login_icon"><MyPerson /></span><span className="icon_text">Bejelentkezés</span>
              </div>
              <div className="cart_container">
                <span className="cart_icon"><MyShoppingCart /></span><span className="icon_text">Kosár</span>
              </div>
            </div>) : (
            <div>
              <div className="login" onClick={() => this.logout()}>
                <span className="login_icon"><MyInput /></span><span className="icon_text">Kijelentkezés</span>
              </div>
              <div className="cart_container" onClick={() => this.showCart()}>
                {/*<span className="cart_no_of_itmes">{this.noOfItemsInCart(this.state.cart)}</span>*/}
                <span className="cart_icon"><MyShoppingCart /></span><span className="icon_text">Kosár</span>
              </div>
            </div>)}
          <div className="logo">
            <img className="logo_img" onClick={() => this.changeView('main')} src={logo} width={80} height={100} alt="logo" />
          </div>
          <div className="navbar">
            <ul className="navbar_list">
              <li className="navbar_item" onClick={() => this.changeView('breakfast')}>Reggelik</li>
              <li className="navbar_item" onClick={() => this.changeView('lunch')}>Ebédek</li>
              <li className="navbar_item" onClick={() => this.changeView('cakes')}>Desszertek</li>
              <li className="navbar_item" onClick={() => this.changeView('drinks')}>Üdítők</li>
            </ul>
          </div>
          <div className="white_row"></div>
        </div>
        {"main" === this.state.view ? (
          <div className="main">
            <div className="intro_background_container">
              <img className="intro_background" src={introBackground} alt="intro_background" />
            </div>
          </div>) : (<div></div>)}
        {"login" === this.state.view ? (
          <div>
            <div className="delimiter"></div>
            <div className="login_header">Belépés</div>
            <div className="login_form">
            <form onSubmit={this.handleLogin}>
              <div>
                <input className="input-style" id="username" name="username" type="text" placeholder="Felhasználónév"/>
              </div>
              <div>
                <input className="input-style" id="password" name="password" type="password" placeholder="Jelszó"/>
              </div>
              <button className="login_button">Belépés</button>
            </form>
            <a className="register_link" onClick={this.register}>Új felhasználó létrehozása</a>
          </div>
          </div>) : (<div></div>)}
        {"register" === this.state.view ? (
          <div>
            <div className="delimiter"></div>
            <div className="register_header">Regisztráció</div>
            <div className="register_form">
              <form onSubmit={this.handleRegistration}>
                <div>
                  <input className="reg_input_style" id="first_name" name="first_name" type="text" placeholder="Keresztnév"/>
                </div>
                <div>
                  <input className="reg_input_style" id="last_name" name="last_name" type="text" placeholder="Vezetéknév"/>
                </div>
                <div>
                  <input className="reg_input_style" id="username" name="username" type="text" placeholder="Felhasználónév"/>
                </div>
                <div>
                  <input className="reg_input_style" id="password" name="password" type="password" placeholder="Jelszó"/>
                </div>
                <button className="register_button">Adatok küldése</button>
              </form>
            </div>
          </div>) : (<div></div>)}
          {"breakfast" === this.state.view ? (
            <div>
              <div className="food_category_header_container breakfast_bg">
                <div className="food_category_header_inner_container">
                  <div className="food_category_header_img_container basic_w">
                      <img className="food_category_header_img" src={breakfast}/>
                  </div>
                  <div className="food_category_header_text_container">
                    <div className="food_category_header_header breakfast_text">Reggelik</div>
                    <div className="food_category_header_text breakfast_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. </div>
                  </div>
                </div>
              </div>
              <FoodCategory
                  items={items.breakfast}
                  active={this.state.loggedIn}
                  addToCartFunc={this.addToCart}
                  addToCartWithExtrasFunc={this.addToCartWithExtras}
                  categoryId={1}
                />
            </div>) : (<div></div>)
          }
          {"lunch" === this.state.view ? (
            <div>
            <div className="food_category_header_container lunch_bg">
              <div className="food_category_header_inner_container">
                <div className="food_category_header_img_container basic_w">
                    <img className="food_category_header_img" src={taco}/>
                </div>
                <div className="food_category_header_text_container">
                  <div className="food_category_header_header lunch_text">Ebédek</div>
                  <div className="food_category_header_text lunch_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
              </div>
            </div>
            <FoodCategory
                items={items.lunch}
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
                addToCartWithExtrasFunc={this.addToCartWithExtras}
                categoryId={2}
              />
           </div>) : (<div></div>)
          }
          {"cakes" === this.state.view ? (
            <div>
            <div className="food_category_header_container cakes_bg">
              <div className="food_category_header_inner_container">
                <div className="food_category_header_img_container cake_w">
                    <img className="food_category_header_img" src={cake}/>
                </div>
                <div className="food_category_header_text_container margin_l">
                  <div className="food_category_header_header cakes_text">Desszertek</div>
                  <div className="food_category_header_text cakes_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
              </div>
            </div>
            <FoodCategory
                items={items.dessert}
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
                addToCartWithExtrasFunc={this.addToCartWithExtras}
                categoryId={3}
              />
            </div>) : (<div></div>)
          }
          {"drinks" === this.state.view ? (
            <div>
            <div className="food_category_header_container drinks_bg">
              <div className="food_category_header_inner_container">
                <div className="food_category_header_img_container drink_w">
                    <img className="food_category_header_img" src={smoothie}/>
                </div>
                <div className="food_category_header_text_container">
                  <div className="food_category_header_header drinks_text margin_l_d">Üdítők</div>
                  <div className="food_category_header_text drinks_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
              </div>
            </div>
            <FoodCategory
                items={items.smoothie}
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
                addToCartWithExtrasFunc={this.addToCartWithExtras}
                categoryId={4}
              />
            </div>) : (<div></div>)
          }
          {"cart" === this.state.view ? (
            <div className="cart_main">
              <div className="delimiter"></div>
              <div className="cart-content">
                {0 === Object.keys(this.state.cart).length ? (
                <div>
                  <div className="cart-header">
                    <span className="cart_heading large">Kosár tartalma</span>
                  </div>
                  <div className="delimiter"></div>
                  <div className="empty_cart">A kosár üres</div>
                </div>
                ) : (
                <div>
                  <div className="cart-header">
                    <span className="cart_heading large">Kosár tartalma</span><button className="cart_empty" onClick={this.clearCart}>x</button>
                  </div>
                  <div className="delimiter"></div>
                <div className="cart-body">
                  <table className="cart-table">
                  </table>
                  <div className="cart_table_container">
                    <table className="cart-table">
                      <tbody>
                      {Object.entries(this.state.cart).map(([key, value]) => (
                        <tr className="cart_table_row">
                          <td className="table-cell left">{key}</td>
                          {undefined === value.extras ? (
                            <td className="table-cell left">-</td>
                          ) : (
                            <td className="small">
                              {value.extras.map((item, index) => (
                                <div>
                                {0 === item.length ? '-' : item.join(', ')}
                                <button className="remove_item" onClick={() => this.removeFromCartWithExtras(index, key, value.price, value.extras)}>x</button>
                                </div>)
                              )}
                            </td>
                          )}
                          <td className="table-cell right wide">
                          {undefined === value.extras ? (
                            <div>
                              <button className="modify_amount" onClick={() => this.removeFromCart(key, value.price)}>-</button>
                              {value.amount}
                              <button className="modify_amount" onClick={() => this.addToCart(key, value.price)}>+</button>
                            </div>
                          ) : (
                            <div>
                              {value.amount}
                              <button className="modify_amount" onClick={() => this.showModalAndSetState(key, value.price, value.extras_keys)}>+</button>
                            </div>
                          )}
                          </td>
                          <td className="table-cell right">{value.price.toFixed(2)} €</td>
                        </tr>
                      ))}
                        <tr>
                          <td className="table-cell left bold"></td>
                          <td className="table-cell left"></td>
                          <td className="table-cell right"></td>
                          <td className="table-cell right bold">{this.calculateTotal(this.state.cart).toFixed(2)} €</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="delivery_time">
                  <div className="cart_heading medium">Mikorra szeretnéd?</div>
                    <DatePicker
                      defaultValue={moment()}
                      onChange={(dateString) => {this.handleDate(dateString)}}
                    />
                    <span className="time_picker">
                      <TimePicker
                        defaultValue={moment()}
                        format={format}
                        onChange={(time) => {this.handleTime(time)}}
                      />
                    </span>
                  </div>
                  <div className="total">
                  {undefined === this.state.hours | undefined === this.state.month ? (
                    <button className="btn disabled" disabled>Megrendelem</button>
                  ) : (
                    <button className="btn active" onClick={this.handleNewOrder}>Megrendelem</button>
                  )}
                  </div>
                </div>
              </div>
              )}
              </div>
            </div>) : (<div></div>)}
      </div>
    );
  }
}
