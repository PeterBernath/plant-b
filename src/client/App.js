import React, { Component } from 'react';
import './styles.less';
import plantB from '../../public/plantb.png';
import FoodCategory from '../components/food-category';
import RegisterWindow from '../components/register';
import LoginWindow from '../components/login';
import CartWindow from '../components/cart';
import items from '../data/fixtures';

const bcrypt = require('bcryptjs');

export default class App extends Component {
  state = {
    main: true,
    loggedIn: false,
    cart: [],
    registerModalVisible: false,
    loginModalVisible: false,
    cartModalVisible: false,
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
    const { registerModalVisible } = this.state;
    this.setState({ registerModalVisible: !registerModalVisible });
  };

  showCart = () => {
    const { cartModalVisible } = this.state;
    this.setState({ cartModalVisible: !cartModalVisible });
  };

  login = () => {
    const { loginModalVisible } = this.state;
    this.setState({ loginModalVisible: !loginModalVisible });
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
      const userData = { username: data.get('username'), password: hash };
      console.log(userData);
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    });
    const { registerModalVisible } = this.state;
    this.setState({ registerModalVisible: !registerModalVisible });
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
        console.log(res);
        sessionStorage.setItem('jwtToken', res.token);
        this.setState({ login: false, loggedIn: true });
      });
    const { loginModalVisible } = this.state;
    this.setState({ loginModalVisible: !loginModalVisible });
  };

  addToCart = async (item) => {
    await this.setState({ cart: [...this.state.cart, item] });
    console.log(this.state.cart);
  };

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <div>
            <div className="register" onClick={() => this.register()}>Regisztráció</div>
            <div className="login" onClick={() => this.login()}>Bejelentkezés</div>
          </div>) : (
          <div>
            <div className="register" onClick={() => this.logout()}>Kijelentkezés</div>
            <div className="login">
              <a onClick={() => this.showCart()}><img src="public/basket.png" alt="cart" height="32" width="32" /></a>
              <span>{this.state.cart.length}</span>
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
        />
        {this.state.main ? (
          <div className="main">
            <div className="logo">
              <img className="logo-img" src={plantB} width={400} height={400} alt="react" />
              <div className="button regular" onClick={() => this.hello()}>Rendelés</div>
              <div className="button regular" onClick={() => this.hello()}>Mi az a Plant B?</div>
            </div>
          </div>) : (
            <div>
              <FoodCategory
                items={items.breakfast}
                heading="Reggeli Csomagok"
                colorDark="#a8ffb5"
                colorLight="#bee034"
                gradient="#0C7147"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
              />
              <FoodCategory
                items={items.lunch}
                heading="Ebéd"
                colorDark="#f9f9f9"
                colorLight="#ffe5cc"
                gradient="#eac7a4"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
              />
              <FoodCategory
                items={items.dessert}
                heading="Desszert"
                colorDark="#f9f9f9"
                colorLight="#ddafba"
                gradient="#fff7f9"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
              />
              <FoodCategory
                items={items.smoothie}
                heading="Italok"
                colorDark="#f9f9f9"
                colorLight="#9e9c9c"
                gradient="#96C534"
                active={this.state.loggedIn}
                addToCartFunc={this.addToCart}
              />
            </div>
        )}
      </div>
    );
  }
}
