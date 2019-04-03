import React, { Component } from 'react';
import '../styles/products.css'
import { Link } from 'react-router-dom';
import broken_img from '../img/broken_img.png'


class Products extends Component {
  constructor(props){
    super(props);
  this.state = {
    products: [],
    searchString: ""
  }
  this.handleChange = this.handleChange.bind(this);
}

  async componentDidMount() {
    const response = await fetch('http://localhost:4180/products')
    const products = await response.json()
    this.setState({ products })
    this.refs.search.focus();
  }

  handleChange(){
    this.setState({
      searchString: this.refs.search.value
    });
  }


  render() {
    const { products } = this.state
    let search = this.state.searchString.trim().toLowerCase();
    let _products = products 
    if (search.length > 0){
      _products = _products.filter(function(product){
        return product.name.toLowerCase().match(search);
      });
    }
    return (
      <div className="products">
        <header className="productsHeader">
          <h1 className="headerTitle">OUR PRODUCTS</h1>
          <input
            className="searchInput"
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="Search products"
          />
        </header>
        <section >
          <div >
            <ul className="productsList">
              {_products.map(product =>
                <li className="productCard"> 
                  <div className="productCard">
                    <h4 id="name">
                    {product.name} 
                    </h4>
                    <h6 id="description">
                      <br/>
                      ID: {product.id}
                      <br/>
                      DESCRIPTION: {product.description}
                      <br/>
                      PRICE: {product.price}$
                    </h6>
                    <Link to={"/products/" + product.id} style={{textDecoration: "none"}}>
                      <button id="detailsButton">View Details</button>
                    </Link>
                  </div> 
                  <img className="img" src={broken_img} alt="broken img"/>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Products;