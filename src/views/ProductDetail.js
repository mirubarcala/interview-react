import React, { Component } from 'react';
import '../styles/productDetails.css';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  state = {
    name: null,
    sku: null,
    price: null,
    image: null,
    description: null,
    category: null, 
    size: null,
    brand: null,
    stock: null, 
   
  }
  async componentDidMount() {
    const { match: { params: { id } } } = this.props
    
    const response = await fetch(`http://localhost:4180/products/${id}`)
    const { name, sku, price, image, description, category, size, brand, stock} = await response.json()
    this.setState({ name, sku, price, image, description, category, size, brand, stock })
  }
  render() {
    const { match: { params: { id } } } = this.props
    const { sku, name, price, image, description, category, size, brand, stock } = this.state
    return (
      <div className="productDetails">
        <div className="detail">
          <h1> {name}</h1>
          <Link to="/products">
            <button>BACK TO PRODUCTS</button>
          </Link>
          <ul>
            <li>SKU: {sku}</li>
            <li>Price: {price}</li>
            <li>Image: {image}</li>
            <li>Description: {description}</li>
            <li>Category: {category}</li>
            <li>Size: {size}</li>
            <li>Brand: {brand}</li>
            <li>Stock: {stock}</li>
          </ul>
          </div>
      </div>
    )
  }
}

export default ProductDetail