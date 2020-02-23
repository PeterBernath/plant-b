import _ from 'lodash';
import React, { Component } from 'react';
import './styles.less';
import PersonPin from '@material-ui/icons/PersonPin';
import Input from '@material-ui/icons/Input';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import logo from '../../public/logo_new.png';
import lunch_header from '../../public/lunch_header.png';
import taco from '../../public/taco.png';
import cake from '../../public/cake.png';
import smoothie from '../../public/smoothie.png';
import introBackground from '../../public/intro_background.png';
import FoodCategory from '../components/food-category';
import RegisterWindow from '../components/register';
import LoginWindow from '../components/login';
import CartWindow from '../components/cart';
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
    registerModalVisible: false,
    loginModalVisible: false,
    cartModalVisible: false,
    view: 'main',
    startDate: new Date(),
    time: '10:00',
  };

  componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      console.log(token);
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
    const password = data.get('password');
    bcrypt.hash(password, 10, (err, hash) => {
      const userData = {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        username: data.get('username'),
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
          this.setState({ view: 'main' });
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
          this.setState({ view: 'main', loggedIn: true });
        } else {
          Swal.fire({text: 'Helytelen felhasználónév vagy jelszó', icon:'error'})
        }
      });
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
    if (cart[item] === undefined) cart[item] = { amount: 1, price, extras };
    else cart[item] = { amount: cart[item].amount + 1, price, extras };
    await this.setState({ cart });
    console.log(this.state.cart);
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

  render() {
    return (
      <div>
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
        <RegisterWindow
          handlerFunc={this.handleRegistration}
          modalVisible={this.state.registerModalVisible}
          closeFunc={this.register}
        />
        <LoginWindow
          handlerFunc={this.handleLogin}
          modalVisible={this.state.loginModalVisible}
          closeFunc={this.login}
        />
        <CartWindow
          cart={this.state.cart}
          modalVisible={this.state.cartModalVisible}
          closeFunc={this.showCart}
          cartTotal={this.calculateTotal(this.state.cart)}
        />
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
            <div className="breakfast_header_container">
              <div className="breakfast_header_inner_container" >
                <div className="breakfast_header_img_container" >
                    <img className="breakfast_header_img" src={lunch_header} width={300} height={300} />
                </div>
                <div className="breakfast_header_text_container">
                  <div className="breakfast_header_header">Reggelik</div>
                  <div className="breakfast_header_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
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
          </div>) : (<div></div>)}
          {"lunch" === this.state.view ? (
          <div>
            <div className="lunch_header_container">
              <div className="lunch_header_header">Ebédek</div>
              <div className="lunch_header_text_container">
                <div className="lunch_header_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. </div>
              </div>
              <div className="lunch_header_img_container" >
                <img className="lunch_header_img" src={taco} width={64} height={64} />
              </div>
            </div>
            {/* <FoodCategory
                items={items.lunch}
                heading="Ebéd"
                colorDark="#f9f9f9"
                colorLight="#ffe5cc"
                gradient="#eac7a4"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
                addToCartWithExtrasFunc={this.addToCartWithExtras}
                categoryId={2}
              /> */}
          </div>) : (<div></div>)}
          {"cakes" === this.state.view ? (
          <div>
            <div className="cakes_header_container">
              <p className="cakes_header_header">Desszertek</p>
              <div className="cakes_header_text_container">
                <p className="cakes_header_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
              <div className="cakes_header_img_container" >
                <img className="cakes_header_img" src={cake} width={64} height={64} />
              </div>
            </div>
            <FoodCategory
                items={items.dessert}
                heading="Desszert"
                colorDark="#f9f9f9"
                colorLight="#ddafba"
                gradient="#fff7f9"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
                addToCartWithExtrasFunc={this.addToCartWithExtras}
                categoryId={3}
              />
          </div>) : (<div></div>)}
          {"drinks" === this.state.view ? (
          <div>
            <div className="drinks_header_container">
              <p className="drinks_header_header">Üdítők</p>
              <div className="drinks_header_text_container">
                <p className="drinks_header_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
              <div className="drinks_header_img_container" >
                <img className="drinks_header_img" src={smoothie} width={64} height={64} />
              </div>
            </div>
            <FoodCategory
                items={items.smoothie}
                heading="Italok"
                colorDark="#f9f9f9"
                colorLight="#9e9c9c"
                gradient="#96C534"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
                addToCartWithExtrasFunc={this.addToCartWithExtras}
                categoryId={4}
              />
          </div>) : (<div></div>)}
        {"cart" === this.state.view ? (
          <div className="cart_main">
            <div className="delimiter"></div>
            <div className="cart-content">
              <div className="cart-header">
                <span className="cart-heading">Kosár tartalma</span>
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
                          <td className="small">{value.extras.map((item) => (<p>{0 === item.length ? '-' : item.join(', ')}</p>))}</td>
                        )}
                        <td className="table-cell right">{value.amount}</td>
                        <td className="table-cell right">{value.price} €</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="delivery_time">
                <p>Mikorra szeretnéd?</p>
                  <DatePicker
                    
                  />
                  <TimePicker
                    defaultValue={moment('12:08', format)}
                    format={format}
                  />
                </div>
                <div className="total">
                  <p>Végösszeg</p>
                  <p>{this.calculateTotal(this.state.cart)} €</p>
                </div>
              </div>
            </div>
          </div>) : (<div></div>)}
      </div>
    );
  }
}
