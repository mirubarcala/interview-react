import React, { Component } from 'react';
import '../styles/products.css'
import { Link } from 'react-router-dom';


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
          <h1>OUR PRODUCTS</h1>

          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="Search products"
          />
          
        </header>
        <ul className="productCards">
          {_products.map(product =>
            <li> 
              <div className="product">
                <h2>
                 {product.name} 
                </h2>
                <h6>
                  <br/>
                  ID: {product.id}
                  <br/>
                  DESCRIPTION: {product.description}
                  <br/>
                  PRICE: {product.price}$
                </h6>
                <Link to={"/products/" + product.id} style={{textDecoration: "none"}}>
                  <button>View Details</button>
                </Link>
              </div> 
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Products;