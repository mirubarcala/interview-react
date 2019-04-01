import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignIn from './SignIn';
import Products from './Products';
import ProductDetail from './ProductDetail';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path='/products' component={Products} />
            <Route path='/products/:id' component={ProductDetail} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;