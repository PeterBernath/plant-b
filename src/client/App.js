import React, { Component } from 'react';
import './styles.less';
import plantB from './plantb.png';
import sandwich from './sandwich.png';
import sandwich2 from './sandwich2.png';
import sandwich3 from './sandwich3.png';

export default class App extends Component {
  state = {
    main: true,
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then((user) => {
        this.setState({ username: user.username });
        console.log('ggg')
      });
  }

  hello = () => {
    const { main } = this.state;
    this.setState({ main: !main });
    fetch('/api/hello')
      .then(res => res.json())
      .then(response => console.log(response));
  }

  render() {
    return (
      <div>
        {this.state.main ? (
          <div className="main">
            <div className="logo">
              <img src={plantB} width={400} height={400} alt="react" />
              <div className="button regular" onClick={() => this.hello()}>Rendelés</div>
              <div className="button regular" onClick={() => this.hello()}>Mi az a Plant B?</div>
            </div>
          </div>) : (
          <div className="menu">
            <div className="menu-point">
              <div className="menu-header">Reggeli Csomagok</div>
              <div className="menu-items">
                <div className="item">
                  <div className="image-container">
                    <img className="image" src={sandwich} />
                  </div>
                  <div className="item-heading">Zöldséges szendvics</div>
                  <div className="item-desc">teljes kiőrlésű kenyér, paradicsom, rukkola, kesus kenő</div>
                  <div className="item-price">1,50 €</div>
                </div>
                <div className="item">
                  <div className="image-container">
                    <img className="image" src={sandwich2} />
                  </div>
                  <div className="item-heading">Paradicsomos szendvics</div>
                  <div className="item-desc">teljes kiőrlésű kenyér, paradicsom, rukkola, kesus kenő</div>
                  <div className="item-price">1,50 €</div>
                </div>
                <div className="item">
                  <div className="image-container">
                    <img className="image" src={sandwich3} />
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}
