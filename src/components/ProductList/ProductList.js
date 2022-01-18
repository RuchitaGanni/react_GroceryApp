import React, { Component, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './ProductList.css';
import Products from './Products'
import axios from 'axios';
// const productUrl="https://edu-groceryapp.herokuapp.com/products?category_id";
const productUrl = "https://edu-groceryapp.herokuapp.com/products";
class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 0,
            products: '',
            product_category_name: ''
        }

    }

    increase = () => {
        if (this.state.counter >= 0 && this.state.counter < 5) {
            this.setState({ counter: this.state.counter + 1 })
        }
    }
    decrase = () => {
        if (this.state.counter > 0) {
            this.setState({ counter: this.state.counter - 1 })
        }
    }
    render() {

        return (
            <Fragment>
                <Header/>
                <div className="container" id="main-body-container" style={{marginTop:"40px"}}>
                    {/* <ol class="breadcrumb">
                        <li></li>

                        <li > </li>
                    </ol> */}
                    <Link to='/'><span class="label label-default bdcrm">Home</span></Link>
                    <span class=" bdcrm"><i class="fas fa-chevron-right"></i></span>
                    <span class="label label-success bdcrm">{this.state.product_category_name}</span>
                    <Products list={this.state.products}  />
                </div>
            </Fragment >
        )
    }

    componentDidMount() {
        const qparam = this.props.location.search;
        axios.get(`${productUrl}${qparam}`)
            .then((res) => {
                if (res.data.length >= 1) {
                    this.setState({ products: res.data })
                    this.setState({ product_category_name: res.data[0].category_name })
                }
            })
    }
}

export default ProductList;