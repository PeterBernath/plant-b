import React, { Component } from 'react';
import './styles.less';
import plantB from './plantb.png';
import sandwich from './sandwich2.png';

export default class App extends Component {
  state = {
    main: true,
    menu: false,
    hidden: false,
    'showMenu': false,
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then((user) => {
        this.setState({ username: user.username });
        console.log('ggg')
      });
  }

  settt = () => {
    this.setState({ main: !this.state.main });
    this.setState({ showMenu: !this.state.showMenu });
  }

  hello = () => {
    this.setState({ hidden: !this.state.hidden });
    // this.settt();
    fetch('/api/hello')
      .then(res => res.json())
      .then(response => console.log(response));
  }

  render() {
    return (
      <div>
        {this.state.main ? (
        <div className={`${true === this.state.hidden ? 'main-hidden' : 'main'}`}>
          <div className="logo">
              <img src={plantB} width={400} height={400} alt="react" />
              <div className="button regular" onClick={() => this.hello()}>Rendelés</div>
              <div className="button regular" onClick={() => this.hello()}>Mi az a Plant B?</div>
          </div>
        </div>) : (
        <div className={`${true === this.state.showMenu ? 'show-menu' : 'menu-hidden'}`}>
          <div className="logo">
            <div className="price">
              <div className="price-number">3.59</div>
              <div className="price-tag"></div>
              <div className="price-tag transparent"></div>
              <img src={sandwich} width={400} height={400} alt="react" />
            </div>
              <div className="button regular" onClick={() => this.hello()}>Rendelés</div>
              <div className="button regular" onClick={() => this.hello()}>Mi az a Plant B?</div>
            </div>
        </div>)}
      </div>
    );
  }
}
