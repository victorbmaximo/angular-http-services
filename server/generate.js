const mongoose = require('mongoose');
const prodocut = require('./product.js');
const faker = require('faker');

mongoose.connect(
    'mongodb://localhost:27017/http_client',
    {useNewUrlParser: true, useUnifiedTopology: true}

);

async function generateProducts() {
    for(let i=0; i < 10; i++) {
        let p = new prodocut({
            name: faker.commerce.productName(),
            department: faker.commerce.department(),
            price: faker.commerce.price()
        })
        try {
            await p.save();
        }
        catch(err) {
            throw new Error("Error generating products");
        }
    }

    
}

generateProducts()
    .then(() => {
        mongoose.disconnect();
        console.log('OK');
    })

