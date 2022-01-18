import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios';
import MainBody from '../MainBody/MainBody'
class Header extends Component {

    constructor() {
        super()

        this.state = {
            cartCount: 0
        }
    }

    // cartFunc = () => {
    //     console.log('caaled')
    //     axios.get("https://edu-groceryapp.herokuapp.com/getOrders")
    //         .then((res) => {
    //             if (res.data.length >= 1) {
    //                 this.setState({ cartCount: res.data.length })

    //             }
    //         })
    // }
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-default ">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            {/* <a class="navbar-brand" href="#">WebSiteName</a> */}
                            <Link to="/" className="navbar-brand"><span className="nav_text">Grocery</span></Link>
                        </div>

                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li ><Link exact to="/" className="links">Home</Link></li>

                                <li><Link exact to="/cart" className="links"><i class="fa fa-shopping-basket" aria-hidden="true"></i><span className="cartCount">{this.state.cartCount}</span></Link></li>
                                <li id="userinfo"><Link exact to="/" className="links"><i class="fa fa-user" aria-hidden="true"></i>  Hello..!! Ruchita</Link></li>
                            </ul>
                            {/* <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                                <li><Link to="/"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                            </ul> */}
                        </div>
                    </div>
                </nav>
                {/* <MainBody /> */}
            </Fragment >
        )
    }
    // async componentDidMount() {
    //     try {
    //         setInterval(async () => {
    //             axios.get("https://edu-groceryapp.herokuapp.com/getOrders")
    //                 .then((res) => {
    //                     if (res.data.length >= 1) {
    //                         this.setState({ cartCount: res.data.length })

    //                     }
    //                 })
    //         }, 3000);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

export default Header