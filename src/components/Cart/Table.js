import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
const cartListUrl = "https://edu-groceryapp.herokuapp.com/getOrders";
const placeOrderUrl = "https://edu-groceryapp.herokuapp.com/saveOrder"
const Table = (props) => {
    const [carts, setCart] = useState([]);
    const [tables, showTable] = useState("none");
    const [loaders, showLoader] = useState("block");

    useEffect(() => {

        axios.get(`https://edu-groceryapp.herokuapp.com/getOrders?user=${sessionStorage.getItem('userEmail')}`)
            .then((res) => {
                if (res.data.length >= 1) {

                    setCart(carts => (res.data));
                    showLoader("none");
                    showTable("block")

                } else {
                    showLoader("block");
                    showTable("none")
                }
            })

    }, []);

    let totalUnits = 0;
    let totalCost = 0;
    let pids = [];
    const increase = (pid, qty) => {
        if (qty < 5) {
            setCart(carts =>
                carts.map((i) =>
                    // if product matches increase else  return the same object
                    i.product_id === pid ? { ...i, quantity: (i.quantity + 1) } : i

                )

            );
            let prodObj = {
                product_id: pid,
                quantity: qty + 1,
                status: 0
            };
            axios.put("https://edu-groceryapp.herokuapp.com/updateStatus", prodObj)
                .then((reponse) => {

                })
        }

    }
    const decrease = (pid, qty) => {

        if (qty > 1) {

            setCart(carts =>
                carts.map((i) =>
                    // if product matches increase else  return the same object
                    i.product_id === pid ? { ...i, quantity: (i.quantity - 1) } : i

                )

            );
            let prodObj = {
                product_id: pid,
                quantity: qty - 1,
                status: 0
            };
            axios.put("https://edu-groceryapp.herokuapp.com/updateStatus", prodObj)
                .then((reponse) => {

                })
        } else if (qty == 1) {

            axios.delete(`https://edu-groceryapp.herokuapp.com/deleteOrder/${pid}`)
                .then((reponse) => {

                    document.getElementById(pid).remove();
                    setCart(carts =>
                        carts.map((i) =>
                            // if product matches increase else  return the same object
                            i.product_id === pid ? { ...i, quantity: (i.quantity - 1) } : i

                        )

                    );
                    carts.map(i => {

                        totalCost = totalCost - (i.quantity * i.product_price);
                        totalUnits = totalUnits - (i.quantity)
                        sessionStorage.setItem('totalCost', totalCost);
                        sessionStorage.setItem('totalUnits', totalUnits);
                    })
                    //window.location.reload();
                    // history.push('/cart')
                })
        }

    }


    let xx = carts.map(i => {
        pids.push(i.product_id)
        totalCost = totalCost + (i.quantity * i.product_price);
        totalUnits = totalUnits + (i.quantity)
        sessionStorage.setItem('totalCost', totalCost);
        sessionStorage.setItem('totalUnits', totalUnits);
        sessionStorage.setItem('active_pid', pids);
        sessionStorage.setItem('totalCostddddd', 1000);

    })
        ;

    const placeOrder = () => {
        if (sessionStorage.getItem('userEmail') == 'undefined') {

        } else {
            let orderId = Math.floor(Math.random() * 10000)
            const pids = sessionStorage.getItem('active_pid').split(',');
            let dd = {
                orderid: orderId,
                items: carts,
                totalCost: totalCost,
                totalUnits: totalUnits,
                orderType: "grocery",
                email: sessionStorage.getItem('userEmail')
            };
            props.check(dd);
            fetch(placeOrderUrl, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    orderId: orderId,
                    items: carts,
                    totalCost: totalCost,
                    totalUnits: totalUnits,
                    orderType: "grocery",
                    email: sessionStorage.getItem('userEmail')
                })
            })
                //.then(this.props.history.push('/viewBooking'))
                .then((res) => {
                    sessionStorage.setItem('totalUnits', 0)
                    sessionStorage.setItem('totalCost', 0)
                    sessionStorage.setItem('totalCostddddd', '0');

                    pids.map((i) => {
                        axios.put("https://edu-groceryapp.herokuapp.com/updateItemStatus", {
                            "product_id": i
                            , "order_id": orderId
                        })
                            .then((reponse) => {
                                // console.log('going for payment', i, 'res', reponse)
                            })
                    })


                })
        }

    }



    return (
        <fragment>

            <div style={{ display: loaders, textAlign: 'center' }}>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "15px" }}>
                    No items found in cart
                </span>
                <img src="/images/loader4.gif" alt="loader" className="LoaderGIF2" />
            </div>
            <div style={{ display: tables }}>
                <span style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
                    Only 5 units of each items is allowed per order
                </span>
                <h3>Your Basket has {sessionStorage.getItem('totalUnits')} items</h3>


                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered" id="cartTable">
                        <thead className="thead-dark">
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Sub Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {carts.map(item => (
                                <tr key={item.product_id} id={item.product_id}>
                                    <td>
                                        <div className="cartDivs">
                                            <img src={item.image} alt={item.product_name} className="cartImage" />
                                        </div>
                                    </td>
                                    <td>{item.product_name}</td>
                                    <td>
                                        <div className="parts2">
                                            <Button variant="outlined" size="samll" color="error" onClick={(pid, qty) => decrease(item.product_id, item.quantity)} id="minusIcon">
                                                <i class="fa fa-minus fa-2x" aria-hidden="true" style={{ color: "red" }}>
                                                </i>
                                            </Button>
                                            {/* <button className="btn" onClick={(pid, qty) => decrease(item.product_id, item.quantity)} id="minusIcon" type="button">
                                            <i class="fa fa-minus" aria-hidden="true" style={{ color: "red" }}>
                                            </i>
                                        </button> */}

                                            <span className="counter">{item.quantity}</span>
                                            <Button variant="outlined" size="samll" color="success" onClick={(pid, qty) => increase(item.product_id, item.quantity)} id="plusIcon">
                                                <i class="fa fa-plus fa-2x" aria-hidden="true" style={{ color: "green" }}></i>

                                            </Button>
                                            {/* <button className="btn" onClick={(pid, qty) => increase(item.product_id, item.quantity)} id="plusIcon" type="button">
                                            <i class="fa fa-plus" aria-hidden="true" style={{ color: "green" }}></i>
                                        </button> */}

                                        </div>
                                    </td>
                                    <td>&#8377; {item.product_price}</td>
                                    <td>&#8377; {item.quantity * item.product_price}</td>



                                </tr>

                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>TOTAL ITEMS: {totalUnits}</td>
                                <td></td>
                                <td>
                                    TOTAL:  &#8377; {totalCost}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="checkOutDiv">

                        {/* <Button variant="contained" size="large" color="success" onClick={placeOrder}>
                        Proceed to check Out
                    </Button> */}
                        <button id="checkOut" className="btn btn-primary pull-right" onClick={placeOrder}  >
                            <span class="btn_txt">Proceed to check Out</span>
                        </button>

                    </div>
                    {/* <input type="hidden" name="amount" value={totalCost} />
                <input type="hidden" name="id" value={orderId} />
                <input type="hidden" name="hotel_name" value="grocerypayments" />
                <input type="hidden" name="name" value="grocerypayments" />
                <input type="hidden" name="phone" value="grocerypayments" />
                <input type="hidden" name="email" value="grocerypayments" />
                <input type="hidden" name="address" value="grocerypayments" /> */}
                </div>
            </div>
        </fragment>
    );
}

export default Table;