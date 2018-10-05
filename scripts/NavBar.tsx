import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

const title = '{ alternate.vote.manager }';
export default class NavBar extends Component<any, any> {

  menu: any;

  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  closeMenu = (e) => {
    if (e.target !== this.menu && this.state.dropDownOpen) {
      this.setState({
        dropDownOpen: false
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      dropDownOpen: true,
    });
  }


  render() {
    const { dropDownOpen } = this.state;
    return (
      <div className="nav-bar fixed">
        <div className="container grid-lg">
          <div className="columns">
            <div className="column col-12">
              <header className="navbar">
                <section className="navbar-section">
                  <Link to="/votemanager" className="navbar-brand mr-10">{ title }</Link>
                </section>
                <section className="navbar-section">
                  <div className="show-md">
                    <div className="dropdown dropdown-right active">
                      <a href="#menu" className="btn btn-link" tabIndex={0} onClick={this.handleClick} ref={el => this.menu = el}>
                        Menu <i className="icon icon-caret" />
                      </a>
                    </div>
                  </div>
                </section>
              </header>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
