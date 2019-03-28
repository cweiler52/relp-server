'use strict';

const express  = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');

/* ALLOWS A NEW USER TO BE CREATED WITH A USERNAME & PASSWORD */
router.get('/search/:price/:location', (req, res) => {
    // Place holder for Yelp Fusion's API Key. Grab them
    // from https://www.yelp.com/developers/v3/manage_app
    const apiKey = 'SXdv90p3vyM9218pmgmFn4Dc-rN09Oxm09pWzgFtdRdo6LIaZqxaRH3WnSyGlPRXeKdVAtL601SPJj85oxRdsI4pqjRl7T6cWTMCs9ogXyc5pG6eaWq1AbjGCtWbXHYx';

    const searchRequest = {
        price: req.params.price,
        location: req.params.location,
        open_now: true
    };

    const client = yelp.client(apiKey);

    client.search(searchRequest)
        .then(response => {
            const firstResult = response.jsonBody.businesses[0];
            const prettyJson = JSON.stringify(firstResult, null, 4);
            console.log(prettyJson);
            res.status(200).json({
                name: firstResult.name,
                image_url: firstResult.image_url,
                rating: firstResult.rating,
                location: firstResult.location.display_address,
                display_phone: firstResult.display_phone,
                coordinates: firstResult.coordinates,
                transactions: firstResult.transactions
            })
        })
        .catch(e => {
            console.log(e);
            res.status(501).json(e);
        });

});

module.exports = router;