import React from 'react';
import {Component} from 'react';
import './App.css';
import Navbar from './navbar';

//Services
import HttpService from '../services/http-service';

//Components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

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
          <Navbar />
            <p>
              Etnik Shala Shop
            </p>
            <div className="container-fluid App-main">
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    {this.productList()}
                  </div>
                </div>
                <div className="col-sm-4">
                  <WishList />
                </div>
              </div>
            </div>
        </div>
      );
    }
}

export default App;
