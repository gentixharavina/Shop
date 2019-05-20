var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/shop-api');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Product

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/product', function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send({error: "could not fetch products"})
    } else {
      res.send(products);
    }
  });
});

//app.delete('/product:productName'), function(req, res) {
//  var text = req.body.text;
//  Product.find(productName, function(err, products) {
//    if (err) {
//      res.status(500).send({error: "could not find the specific ID"});
//    } else {
//      res.delete(product);
//  }
//  });
//}

app.post('/product', function(req, res) {
  var product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.save(function(err, savedProduct) {
    if (err) {
      res.status(500).send({error:"Could not save product"});
    } else {
      res.status(200).send(savedProduct);
    }
  });
});

// Wish List

app.get('/wishlist', function(req, res) {
  WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists) {
    if (err) {
      res.status(500).send({error:'Could not fetch wishlists'});
    } else {
      res.status(200).send(wishLists);
    }
  })
});

app.post('/wishlist', function(req, res) {
  var wishList = new WishList();
  wishList.title = req.body.title;
  wishList.save(function(err, newWishList) {
    if (err) {
      res.status(500).send({error:"could not create"});
    } else {
      res.send(newWishList);
    }
  });
});

app.put('/wishlist/product/add', function(req, res) {
  Product.findOne({_id: req.body.productId}, function(err, product) {
    if (err) {
      res.status(500).send({error: "Could not add product to wishlist"});
    } else {
      WishList.update({_id: req.body.wishListId}, {$addToSet: {products: product._id}}, function(err, wishList) {
        if (err) {
          res.status(500).send({error:"Could not add item to wishlist"});
        } else {
          res.send(wishList);
        }
      });
    }
  });
});

app.listen(3004, function() {
  console.log("API runnin on port 3004")
});
