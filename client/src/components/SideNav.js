import React, { Component } from "react";
import M from "materialize-css";
import { Link } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";

class Sidenav extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };

    M.Sidenav.init(this.Sidenav);

  }
  render() {
    return (
      <>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id="slide-out"
          className="sidenav"
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
        >
            <li>
                <div>
                    <Link 
                    to={this.props.auth ? '/' : '/'} 
                    className="brand-logo black-text"
                    style={{position:'relative'}}
                    >
                        Emaily
                    </Link>
                </div>
            </li>
            {this.props.children}
        </ul>
        <a href="#!" >
          <i className="material-icons">menu</i>
        </a>
        <div className="fixed-action-btn" style={{marginRight: '6rem'}}>
            <div data-target="slide-out" className="sidenav-trigger btn-floating btn-large red">
                <i className="material-icons">menu</i>
            </div>
        </div>
      </>
    );
  }
}

export default Sidenav;