'use strict';

const express  = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');

/* ALLOWS A USER TO SEARCH FOR A RESTRAUNT BASED ON PRICE AND LOCATION  */
router.get('/search/:price/:location', (req, res) => {
    const apiKey = 'SXdv90p3vyM9218pmgmFn4Dc-rN09Oxm09pWzgFtdRdo6LIaZqxaRH3WnSyGlPRXeKdVAtL601SPJj85oxRdsI4pqjRl7T6cWTMCs9ogXyc5pG6eaWq1AbjGCtWbXHYx';

    const searchRequest = {
        price: req.params.price,
        location: req.params.location,
        open_now: true
    };

    const client = yelp.client(apiKey);
    client.search(searchRequest)
        .then(response => {
            const randomNum = Math.floor(Math.random() * (response.jsonBody.businesses.length - 1));
            const firstResult = response.jsonBody.businesses[randomNum];
            const prettyJson = JSON.stringify(firstResult, null, 4);
            // console.log(prettyJson);
            res.status(200).json(firstResult)
        })
        .catch(e => {
            console.log(e);
            res.status(501).json(e);
        });

});

module.exports = router;