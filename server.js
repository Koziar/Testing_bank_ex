var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (req, res) {
    res.send('Homework API - Testing class - Lukasz Koziarski');
});

app.post('/interest', function(req, res) {
    var interest = countInterest(req.body.amount);
    res.status(200).send(String(interest));
});

app.post('/discount', function(req, res) {
    var discount = countDiscount(req.body.newCust, req.body.loyalCard, req.body.coupon);
    res.status(200).send(String(discount));
});

// 404
app.use(function(req, res, next) {
    res.send("Error 404: Not found!");
});

function countInterest(amount){
    var interest = 0;

    if (amount >= 0.00 && amount <= 100.00) {
        interest = amount * 0.03;
    } else if (amount >= 100.01 && amount <= 999.99) {
        interest = amount * 0.05;
    } else if (amount >= 1000.00) {
        interest = amount * 0.07;
    }
    return interest;
}

function countDiscount(newCust, loyal, coupon) {
    var discount = 0;

    if ((newCust && !loyal && coupon) || (!newCust && !loyal && coupon)) {
        discount = 20;
    } else if (newCust && !loyal && !coupon) {
        discount = 15;
    } else if (!newCust && loyal && coupon) {
        discount = 30;
    } else if (!newCust && loyal && !coupon) {
        discount = 10;
    } else if (!newCust && !loyal && !coupon) {
        discount = 0;
    }

    return discount;
}
