import React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
import Product from '../product/product';

const http = new HttpService();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {products: []};

    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }

  loadData = () => {
    http.getProducts().then(data => {
      this.setState({products: data})
    }, err => {

    });
  }

  productList = () => {
    const list = this.state.products.map((product) => (
      <div className="col-sm-4" key={product._id}>
        <Product title={product.title} price={product.price} imgUrl={product.imgUrl}/>
      </div>
    )
    );
    return (list)
  }

  render() {
      return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Etnik Shala Shop
            </p>
            <div className="container App-main">
            <div className="row">
              {this.productList()}
            </div>
            </div>
        </div>
      );
    }
}

export default App;
