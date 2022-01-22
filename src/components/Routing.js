import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header/Header';
import Cart from './Cart/Cart'
import MainBody from './MainBody/MainBody';
import ProductList from './ProductList/ProductList'
import Products from './ProductList/Products'
import Booking from './Booking/Booking';
import Login from './Login/Login'
import Signup from './Login/Signup'
const Routing = () => {
    return(
        <BrowserRouter>
            {/* <Header/> */}
                <Route exact path="/" component={MainBody}/>
                <Route exact path="/cart" component={Cart}/>
                <Route  path="/product/:pid" component={ProductList}/>
                <Route exact path="/prodByCat/:category_id" component={ProductList}/>
                <Route exact path='/saveOrder'/>
                <Route path='/viewBooking' component={Booking} />
                <Route path="/Login" component={Login}/>
                <Route path="/Signup" component={Signup}/>
                {/* <Route exact path="/post" component={Post}/>
                <Route path="/post/:topic" component={PostDetails}/>
                <Route path="/profile" component={Profile}/> */}
            {/* <Footer/> */}
        </BrowserRouter>
    )
}


export default Routing;