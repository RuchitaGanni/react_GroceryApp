import React, { Component, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Dropdown from '../Dropdown/Dropdown'
import './ProductList.css';
import Products from './Products'
import axios from 'axios';
// const productUrl="https://edu-groceryapp.herokuapp.com/products?category_id";
const productUrl = "https://edu-groceryapp.herokuapp.com/products";
const getprodsByCat = "https://edu-groceryapp.herokuapp.com/getProducts";
const categoryUrl="https://edu-groceryapp.herokuapp.com/category";
class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 0,
           
            products: '',
            product_category_name: '',
            product_category_id: '',
            showProductName: "",
            product_name: ''
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
                <Header />
                <div className="container" id="main-body-container" style={{ marginTop: "40px" }}>
                   
                    <Link to='/'><span class="label label-default bdcrm">Home</span></Link>
                    <span class=" bdcrm"><i class="fas fa-chevron-right"></i></span>
                    <Link to={`/prodByCat/${this.state.product_category_id}`}>
                        <span class="label label-success bdcrm">{this.state.product_category_name}</span>
                    </Link>

                    <span class=" bdcrm">
                        <i class="fas fa-chevron-right" style={{ display: this.state.showProductName }}>

                        </i>
                    </span>
                    <span class="label label-success bdcrm" style={{ display: this.state.showProductName }}>
                        {this.state.product_name}
                    </span>

                    <Products list={this.state.products} />
                </div>
            </Fragment >
        )
    }

    componentDidMount() {
        let finalProdsUrl = ``;
        let parmsObj = this.props.match.params;
        // const pid=this.props.match.params.pid;
        // const qparam = this.match.params.category_id//this.props.location.search;
        console.log(parmsObj)
        if (parmsObj.pid) {
            finalProdsUrl = `${productUrl}/${parmsObj.pid}`
        } else if (parmsObj.category_id) {
            finalProdsUrl = `${getprodsByCat}/${parmsObj.category_id}`;
            this.setState({ product_category_id: parmsObj.category_id });
        }

        axios.get(`${finalProdsUrl}`)
            .then((res) => {
                if (res.data.length >= 1) {
                    this.setState({ products: res.data })
                    this.setState({ product_category_name: res.data[0].category_name })
                    if (Number(res.data.length) == 1) {
                        this.setState({ product_name: this.state.products[0].product_name });
                        this.setState({ product_category_id: this.state.products[0].category_id })
                        this.setState({ showProductName: JSON.stringify("in-line") });
                        console.log(this.state.showProductName)
                    } else {
                        this.setState({ showProductName: JSON.stringify("none") });
                    }
                }
            })
    }
}

export default ProductList;