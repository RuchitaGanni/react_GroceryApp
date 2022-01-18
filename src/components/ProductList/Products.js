import axios from 'axios';
import { useState, useEffect } from 'react'
const addToCartUrl = "https://edu-groceryapp.herokuapp.com/addToCart"
const Products = (props) => {

    //get cart database
    const [carts, setCart] = useState([]);
    const [disable, setDisable] = useState('inline');
    const [prods, setprod] = useState([]);
    // const [value, setValue] = useState();
    useEffect(() => {

        axios.get(`https://edu-groceryapp.herokuapp.com/getOrders`)
            .then((res, err) => {
                if (err) {
                    console.error(err, 'er');
                }
                // console.log(res.data, 'data')
                if (res.data.length >= 1) {

                    setCart(carts => (carts = res.data));

                }
                setprod(props.list);
            })

    }, [carts, props]);

    const mySet1 = [];

    if (carts.length >= 1) {
        carts.map((item) => {

            mySet1.push(item.product_id);

        })
    }
    const addToCart = (pid, pname, q, price, pimage) => {

        let prodObj = '';
        let updqty = 0;
        console.log(mySet1, 'mySet1', typeof mySet1.indexOf(pid))
        let chcek = mySet1.indexOf(pid);
        console.log(chcek, 'chcek')
        if (chcek >= 0) {
            if (carts.length > 0) {
                carts.map((item) => {
                    if (item.product_id === pid) {
                        //setDisable(true)
                        if (item.quantity >= 5) {

                            updqty = item.quantity;
                            console.log('one', updqty)
                        } else {

                            updqty = item.quantity + 1;
                            console.log('two', updqty)
                        }

                    }
                })
            } else {
                console.log('qqqqqqqq', q)
                updqty = q + 1;
            }

            // prodObj= {
            //     product_id: pid,
            //     product_name: pname,
            //     product_price: price,
            //     image: pimage,
            //     quantity: q,
            //     status: 0
            // };
            console.log(prods, 'prods')




            prodObj = {
                product_id: pid,
                quantity: updqty,
                status: 0
            };

            console.log('put', q, pid, 'prodObj', prodObj)

            axios.put("https://edu-groceryapp.herokuapp.com/updateStatus", prodObj)
                .then((reponse) => {
                    console.log(reponse, 'putttttttt');

                    // window.location.reload(true);
                })


        } else {
             setDisable('none')

            // mySet1.add(item.product_id);
            prodObj = {
                product_id: pid,
                product_name: pname,
                product_price: price,
                image: pimage,
                quantity: q + 1,
                status: 0
            };
            console.log('post', q, pid, 'prodObj', prodObj)
            axios.post(addToCartUrl, prodObj)
                .then((reponse) => {
                    console.log(reponse, 'posttttttttttt');
                    mySet1.push(pid);
                    // window.location.reload(true);
                })
            axios.get("https://edu-groceryapp.herokuapp.com/getOrders").then((res) => setCart(res.data))


        }

      


    }



    const renderMeal = () => {
        if (prods.length >= 1) {
            return prods.map((item) => {
                return (<div  id="product_card" key={item.product_id}>
                    <img src={item.product_image} alt={item.product_name}  id="product_image" />

                    <div className="caption_div">
                        <center>
                            <span className="shchead_txt">{item.product_name}</span>
                        </center>
                    </div>
                    <div class="mrp_div">
                        <center>
                            <span class="mrp_txt_prod">&#8377; {item.price}</span>
                        </center>
                    </div>
                    <div class="cart_div">
                        <center>
                            {/* disabled={disable}  style={{display: disable}}*/}
                            <button class="btn btn-primary" id="cart_btn"   onClick={(pid, pname, q, price, pimage) => { addToCart(item.product_id, item.product_name, item.qty, item.price, item.product_image) }}>
                                <span>Add to </span>
                                <span class="fa fa-shopping-basket"></span>
                            </button>

                            {/* <button onClick={(pid, qty) => decrease(item.product_id, item.quantity)}><i class="fa fa-minus" aria-hidden="true"></i></button>
                            <span className="counter">{item.quantity}</span>
                            <button onClick={(pid, qty) => increase(item.product_id, item.quantity)}><i class="fa fa-plus" aria-hidden="true"></i></button> */}

                            {/* <button  className="btn btn-success"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        <span className="counter">{item.qty}</span>
                        <button className="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i></button> */}
                        </center>
                    </div>
                </div>)
            })
        } else {
            return (
                <>
                    <h3>Please wait fetching products</h3>
                    <img src="/images/loader2.gif" alt="loader" className="LoaderGIF" />
                </>
            )

        }
    }
    return (
        <div class="mainTileContainer">
            {renderMeal(props)}
        </div>

    )

}

export default Products;