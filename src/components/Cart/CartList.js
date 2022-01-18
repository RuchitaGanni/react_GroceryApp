import axios from 'axios';
import { useState, useEffect } from 'react'
// const productUrl = "https://edu-groceryapp.herokuapp.com/products?category_id";

function CartList() {

    const [carts, setCart] = useState([]);
    useEffect(() => {
        axios.get("https://edu-groceryapp.herokuapp.com/getOrders")
            .then((res) => {
                if (res.data.length >= 1) {
                    console.log(res.data, 'res')
                    setCart(carts => (res.data))
                }
            })

    }, []);


    let counter = 0;
    const increase = (pid, qty) => {
        console.log(pid, 'pid')
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
                console.log(reponse, 'put');
            })
        console.log(carts, 'i', prodObj);




    }
    const decrease = (pid, qty) => {

        console.log(pid, 'pid desc')
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
                console.log(reponse, 'put');
            })
        console.log(carts, 'i', prodObj);



    }

    return (
        <ul>
            {carts.map(item => (
                <li className="cartList" key={item.product_name}>
                    <div className="cartItems" >
                        <div className="cartDivs">
                            <img src={item.image} alt={item.product_name} className="cartImage" />
                        </div>
                        <div className="cartDivs">
                            <div className="cartItemDesc">

                                <span className="cartItemDesc">{item.product_name}</span>
                                <br />
                                <span class="cartItemMrp">Each: &#8377; {item.product_price}.00</span>
                                <br />
                                <span class="cartItemMrp">Total: &#8377; {item.product_price*item.quantity}.00</span>
                                <br />
                                <span className="shchead_txt"></span>

                            </div>
                            <div className="parts2">
                                <button onClick={(pid, qty) => decrease(item.product_id, item.quantity)}><i class="fa fa-minus" aria-hidden="true"></i></button>
                                <span className="counter">{item.quantity}</span>
                                <button onClick={(pid, qty) => increase(item.product_id, item.quantity)}><i class="fa fa-plus" aria-hidden="true"></i></button>

                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>

    );

}
export default CartList;