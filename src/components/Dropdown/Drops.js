import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

class Drops extends React.Component {

    constructor() {
        super()
        this.state = {
            prodcuts: []
        }
    }

    render() {
        return (
            this.state.prodcuts.map((i) => {
                return (
                    <>
                        <Link to={`/product/${i.product_id}`}  className="drop-down-items">{i.product_name}</Link>
 
                        {/* <Link to={`/product?category_id=${this.props.cc}`} >{i.product_name}</Link> */}
                    </>
                )
            })
        )
    }
    componentDidMount() {

        let mealId = this.props.cc;
        axios.get(`https://edu-groceryapp.herokuapp.com/getProducts/${mealId}`)
            .then((res) => {
                console.log(res.data);

                this.setState({ prodcuts: res.data })
            })
    }
}
export default Drops