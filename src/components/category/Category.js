import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './Category.css';
// class Category extends Component {
//     render() {
//         return (
//             <Fragment>
//                 <div className="row">
//                     <div className="col-sm-1 col-md-2 cat">
//                         <Link to="/product" >
//                             <div className="thumbnail">
//                                 <img src="/images/rice.jpg" alt="Rice" id="shc_img" />
//                                 <div className="caption_div">
//                                     <span className="shchead_txt">Rice</span>
//                                 </div>
//                             </div>
//                         </Link>
//                     </div>
//                     <div className="col-sm-2 col-md-2 cat">
//                         <div className="thumbnail">
//                             <img src="/images/cleaning.jpg" alt="Cleaning  Household" id="shc_img" />
//                             <div className="caption_div">
//                                 <span className="shchead_txt">Cleaning  Household</span>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="col-sm-2 col-md-2 cat">
//                         <div className="thumbnail">
//                             <img src="/images/Beverages.jpg" alt="Beverages" id="shc_img" />
//                             <div className="caption_div">
//                                 <span className="shchead_txt">Beverages</span>
//                             </div>
//                         </div>

//                     </div>

//                     <div className="col-sm-2 col-md-2 cat">
//                         <div className="thumbnail">
//                             <img src="/images/snacks.jpg" alt="Snacks" id="shc_img" />
//                             <div className="caption_div">
//                                 <span className="shchead_txt">Snacks</span>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="col-sm-2 col-md-2 cat">
//                         <div className="thumbnail">
//                             <img src="/images/oils.jpg" alt="Oils" id="shc_img" />
//                             <div className="caption_div">
//                                 <span className="shchead_txt">Oils</span>
//                             </div>
//                         </div>

//                     </div>

//                 </div>
//             </Fragment >
//         )
//     }
// }



const Category = (props) => {
    let renderProduct;
    if (props.cats.length > 0) {
        renderProduct =
            props.cats.map((item) => {
                return (
                    <Link to={`/prodByCat/${item.id}`} key={item.id} >
                        <div className="card">
                            <img src={item.category_image} alt={item.category_name} className="cardImage" />

                            <h4 className="catName"><center>{item.category_name}</center></h4>
                        </div>
                    </Link>
                )
            })
    } else {
        renderProduct =

            <img src="/images/loader4.gif" alt="loader" className="LoaderGIF" />
        // <img src="/images/loader2.gif" alt="loader" className="LoaderGIF" />

        //return (<strong>No products Available</strong>)
    }
    return (
        <Fragment>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">

                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>


                <div className="carousel-inner">
                    <div className="item active">
                        <img src="/images/veggie.jpg" alt="vegetables" className="carousel-images" />
                    </div>

                    <div className="item">
                        <img src="/images/fruits.jpg" alt="Fruits" className="carousel-images" />
                    </div>

                    <div className="item">
                        <img src="/images/dryfruits.jpg" alt="Dry Fruits" className="carousel-images" />
                    </div>
                    <div className="item">
                        <img src="/images/bakery.jpg" alt="Bread" className="carousel-images" />
                    </div>
                </div>


                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <h3>Shop from Categories</h3>
            {renderProduct}
        </Fragment>
    )
}

export default Category;