const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./product.js');



var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/http_client',
    {useNewUrlParser: true, useUnifiedTopology: true}

);

var myLogger = function (req, res, next) {
    console.log(req.body);
    next();
}

app.use(myLogger);

app.get('/products', function(req, res){
    Product.find().lean().exec(
      (err, prods) => {
          if(err)
            res.status(500).send(err);
          else 
            res.status(200).send(prods);
      }  
    );
})

app.listen(3000);