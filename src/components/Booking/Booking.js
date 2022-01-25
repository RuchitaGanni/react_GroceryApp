import React, { Component, Fragment } from 'react';
import axios from 'axios'
import './Booking.css';
import Header from '../Header/Header';
import BookingTable from './BookingTable'
const orderStatusUpdate = "https://edu-groceryapp.herokuapp.com/updateOrder/"
const getFinalOrdersurl = "https://edu-groceryapp.herokuapp.com/finalOrder"
class Booking extends Component {
    constructor() {
        super()
        this.state = {
            orders: ''
        }
    }
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container" >
                    <table className="table table-hover">
                        <thead className="thead-dark" id="bookingsTh">
                            <tr >
                                <th></th>
                                <th>Date Delivered</th>
                                <th>Order Amount</th>
                                <th>Payment Status</th>
                                <th>Payment Mode</th>

                            </tr>
                        </thead>
                        {/* <tbody className="tbodyFinal"> */}
                        <BookingTable finalOrder={this.state.orders} />
                        {/* </tbody> */}
                    </table>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        let email = sessionStorage.getItem('userEmail');
        if (this.props.location) {
            var qparams = this.props.location.search;

            if (qparams) {
                var orderId = qparams.split('&')[1].split('=')[1].split('_')[1];
                if (qparams.split('?')[1].split('&')[0].split('=')[1] === "TXN_FAILURE") {
                    axios.delete(`https://edu-groceryapp.herokuapp.com/deleteOneOrder/${orderId}`)
                        .then((reponse) => { console.log(reponse, 'reponse after delete') })
                } else {
                    var data = {
                        "status": qparams.split('?')[1].split('&')[0].split('=')[1],
                        "date": qparams.split('&')[2].split('=')[1].replace('%20', ' '),
                        "bank_status": qparams.split('&')[0].split('=')[1],
                        "bank": qparams.split('&')[3].split('=')[1]

                    }


                    fetch(`${orderStatusUpdate}${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then((res) => res.json()
                        )
                        .then((data) => {
                            console.log(data, 'datas')
                            // sessionStorage.removeItem('totalUnits')
                            // sessionStorage.removeItem('totalCost')
                            // sessionStorage.setItem('totalCostddddd', 2000);
                            // this.setState({ status: 'Delivered' })
                        })
                }
            }

        }
        axios.get(`${getFinalOrdersurl}/${email}`)
            .then((res) => {
                this.setState({ orders: res.data })
            })
    }
}
export default Booking;