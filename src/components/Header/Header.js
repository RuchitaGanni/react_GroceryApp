import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios';
import MainBody from '../MainBody/MainBody';

import Badge from '@mui/material/Badge';
import { withRouter } from 'react-router-dom';
const userInfoUrl = "http://localhost:5000/api/auth/userInfo"
class Header extends Component {

    constructor(props) {
        super()

        this.state = {
            cartCount: 0,
            userdata: '',
            userinfo: 'Login'
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
    conditionlHeader = () => {
        console.log(this.state.userdata, 'this.state.userdata')
        let data = this.state.userdata;
        let outputArray = [data.username, data.email, data.phone, data.role]
        localStorage.setItem('userdata', outputArray)
        if (this.state.userdata.email) {
            let data = this.state.userdata;
            return (
                <li><Link to="/" className="links"><i class="fa fa-user" aria-hidden="true"></i> {this.state.userinfo} </Link></li>

            )
        } else {
            return (
                <li><Link to="/Login" className="links"><i class="fa fa-user" aria-hidden="true"></i> Login </Link></li>

            )
        }
    }
    handleLogout = () => {

        this.setState({ userdata: '' });
        this.setState({ userinfo: 'Login' });
        localStorage.removeItem('userdata');
        localStorage.removeItem('ltk');
        this.props.history.push('/Login');
    }
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-default" >
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
                                <li ><Link exact to="/viewBooking" className="links">Orders</Link></li>
                                {/* <li id="userinfo"><Link exact to="/" className="links"><i class="fa fa-user" aria-hidden="true"></i>  Hello..!! Ruchita</Link></li> */}

                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                {this.conditionlHeader()}
                                {/* <li><Link to="/" className="links"><i class="fa fa-user" aria-hidden="true"></i> Login In </Link></li> */}
                                <li><Link to="/" className="links" onClick={this.handleLogout}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
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
    componentDidMount() {
        fetch(userInfoUrl, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ltk')
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'data')
                this.setState({
                    userdata: data

                })
                this.setState({ userinfo: data.username })
            })
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

export default withRouter(Header)