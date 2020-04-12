import React from 'react';
import logo_footer from '../../../public/logo_new_footer.png';


class FooterReg extends React.Component {

  render() {
    return (
      <div className="footer_reg">
        <div className="logo_img_footer">
          <span className="copy">&copy;</span><img onClick={() => this.changeView('main')} src={logo_footer} width={60} height={30} alt="logo"/>
        </div>
      </div>
    );
  }
}

export default FooterReg;
