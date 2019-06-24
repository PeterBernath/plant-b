import React, { Component } from 'react';
import './styles.less';
import plantB from '../../public/plantb.png';
import FoodCategory from '../components/food-category';
import RegisterWindow from '../components/register';
import items from '../data/fixtures';

export default class App extends Component {
  state = {
    main: true,
    register: false
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then((user) => {
        this.setState({ username: user.username });
        console.log('ggg');
      });
  }

  hello = () => {
    const { main } = this.state;
    this.setState({ main: !main });
    fetch('/api/hello')
      .then(res => res.json())
      .then(response => console.log(response));
  }

  register = () => {
    const { register } = this.state;
    this.setState({ register: !register });
  }

  render() {
    return (
      <div>
        <div className="link" onClick={() => this.register()}>Regisztráció</div>
        {this.state.register ? (
          <RegisterWindow />
        ) : (<div />)}
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
                colorDark="#f9f9f9"
                colorLight="#5d967e"
                gradient="#0C7147"
              />
              <FoodCategory
                items={items.lunch}
                heading="Ebéd"
                colorDark="#f9f9f9"
                colorLight="#ffe5cc"
                gradient="#eac7a4"
              />
              <FoodCategory
                items={items.dessert}
                heading="Desszert"
                colorDark="#f9f9f9"
                colorLight="#ddafba"
                gradient="#fff7f9"
              />
              <FoodCategory
                items={items.smoothie}
                heading="Italok"
                colorDark="#f9f9f9"
                colorLight="#cbe09f"
                gradient="#96C534"
              />
            </div>
        )}
      </div>
    );
  }
}
