import React, { Component } from 'react';
import '../styles/products.css'
import { Link } from 'react-router-dom';


class Products extends Component {
  state = {
    products: []
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:4180/products')
    const products = await response.json()
    this.setState({ products })
  }

  render() {
    const { products } = this.state
    return (
      <div className="products">
        <header className="productsHeader">
          <h1>OUR PRODUCTS</h1>
          
        </header>
        <ul className="productCards">
          {products.map(product =>
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