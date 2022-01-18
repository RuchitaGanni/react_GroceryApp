import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './Cart.css';
import CartList from './CartList';
import Table from './Table'
import Header from '../Header/Header';
import CartTable from './CartTable'

import axios from 'axios';
const cartListUrl = "https://edu-groceryapp.herokuapp.com/getOrders";
const placeOrderUrl = "https://edu-groceryapp.herokuapp.com/saveOrder"
class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderid: Math.floor(Math.random() * 10000),
            items: '',
            totalCost: 0,
            totalUnits: 0
        }


    }

    placeOrder2 = () => {

        const pids = sessionStorage.getItem('active_pid').split(',');


        console.log('here333', this.state.totalCost)
        console.log(this.state, 'this.state', sessionStorage.getItem('totalCost'), this.setState({ totalCost: sessionStorage.getItem('totalCost') }), this.state)
        fetch(placeOrderUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            //.then(this.props.history.push('/viewBooking'))
            .then((res) => {
                sessionStorage.setItem('totalUnits', 0)
                sessionStorage.setItem('totalCost', 0)
                sessionStorage.setItem('totalCostddddd', 2000);
                // async function x() {
                pids.map((i) => {

                    axios.put("https://edu-groceryapp.herokuapp.com/updateItemStatus", {
                        "product_id": i,
                        "order_id": this.state.orderid
                    })
                        .then((reponse) => {

                            console.log('going for payment', i, 'res', reponse)
                        })
                })



                console.log(res, 'res')
                // console.log(sessionStorage.removeItem('totalUnits'))
            })
        // console.log('going for payment'))
    }


    checkConn = (data) => {
        console.log(data, 'connestabls')
        this.setState({ totalCost: data.totalCost })
        this.setState({ orderid: data.orderid })
    }




    render() {
        return (
            <Fragment>
                <Header />

                <div className="container" id="main-body-container">



                    {/* <form action="http://zompay.herokuapp.com/paynow" method="POST"> */}
                    {/* http://localhost:4100/paynow */}
                    {/* action="https://edu-payment.herokuapp.com/paynow" method="POST" */}
                    {/* check={(datacheck) => { this.checkConn(datacheck) }} */}

                    <form action="https://edu-payment.herokuapp.com/paynow" method="POST">
                        <Table cart={this.state.carts} check={(datacheck) => { this.checkConn(datacheck) }} />
                        <input type="hidden" name="amount" value={this.state.totalCost} />
                        <input type="hidden" name="id" value={this.state.orderid} />
                        <input type="hidden" name="hotel_name" value="grocerypayments" />
                        <input type="hidden" name="name" value="grocerypayments" />
                        <input type="hidden" name="phone" value="grocerypayments" />
                        <input type="hidden" name="email" value="grocerypayments" />
                        <input type="hidden" name="address" value="grocerypayments" />
                        {/* <button type="submit">Make Payment</button> */}
                    </form>

                </div>
            </Fragment >
        )
    }

    componentDidMount() {
        //  sessionStorage.removeItem('totalUnits')
        // sessionStorage.removeItem('totalCost')
        // sessionStorage.removeItem('active_pid')
        console.log('here', sessionStorage.getItem('totalCost'))

        this.setState({ totalCost: sessionStorage.getItem('totalCost') })
        this.setState({ totalUnits: sessionStorage.getItem('totalUnits') })
        axios.get(cartListUrl)
            .then((res) => {
                if (res.data.length >= 1) {
                    this.setState({ cartss: res.data })
                }
            })
    }
}

export default Cart;