import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import '../styles/App.css';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state= {
      loggedIn: false,
      error: false,
      fields: {
        email: '',
        name: '',
        lastName: ''
      },
      errors: {
        email: null,
        name: null,
        lastName: null
      }
    };
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = () => {
    const { fields: { email, name, lastName } } = this.state
    const errors = { email: null, name: null, lastName: null }
    
    if (typeof email !== 'string' || email.length === 0) {
      errors.email = "Email cannot be blank";
    }
    if (typeof name !== 'string' || name.length === 0) {
      errors.name = "Name cannot be blank";
    }
    if(typeof lastName !== 'string' || lastName.length === 0) {
      errors.lastName = "Last Name cannot be blank"
    }
    
    this.setState({ errors })

    const notNullErrors = Object.entries(errors).filter(el => el[1] !== null)
    return notNullErrors.length === 0
  };

  handleChange = field => event => {
    const value = event.target.value
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        [field]: value
      }
    }))
  }

  handleSubmit = event => {
    event.preventDefault()

    const isValid = this.validate();
    if (isValid) {
      this.postData();
    }
  };

  render() {
    const { fields, errors } = this.state;

    if (this.state.loggedIn === "true") {
      return <Redirect to="/products"/>
    }

    return (
        <div className="App">
            <div className="main">
            <header className="header">
              <p className="title">T E C H B O X</p>
            </header>
            <section className="logInBox">
                <div className="logIn">
                <p className="logInText">LOG IN TO CHECK OUR CATALOG</p>
                <form id="doSignIn" onSubmit={this.handleSubmit}>

                    <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={fields.name}
                    onChange={this.handleChange('name')} />
                    {errors.name && <div className="error">{errors.name}</div> } 
                
                    <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    value={fields.lastName}
                    onChange={this.handleChange('lastName')} />

                    {errors.lastName  && <div className="error">{errors.lastName}</div> }

                    <input
                    type="email"
                    placeholder="E-Mail"
                    name="email"
                    id="email"
                    value={fields.email}
                    onChange={this.handleChange('email')} />
                    
                    {errors.email   && <div className="error">{errors.email}</div> }
                    
                    <button className="logInButton" type="submit">LOG IN</button>
                </form>
                </div>
            </section>
            </div>
        </div>
    )
  }

  

  
  postData = async () => {
      const { fields: { email, name, lastName } } = this.state

      const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
      const fetchResponse = await fetch('http://localhost:4180/sign_in', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name, lastName, email })
      })
      const response = await fetchResponse
      if (response.status === 201){
        this.setState({loggedIn: "true"})
      }
  }
}



export default SignIn;