import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import Drops from './Drops'
import './Dropdown.css';
import axios from 'axios'

const categoryUrl = "https://edu-groceryapp.herokuapp.com/category";

const Dropdown = (props) => {
    let makeDrops =

        props.cats.map((i) => {
            return (
                <div className="dropdown" key={i.category_name}>
                    <button className="dropbtn">{i.category_name}  <i class="fas fa-chevron-down"></i></button>
                    <div className="dropdown-content">

                        <Drops cc={i.id} />
                    </div>


                </div>

            )
        })

    return (
        <>
            <div className="mainDrops">
                {makeDrops}
            </div>
        </>
    )

}

export default Dropdown;