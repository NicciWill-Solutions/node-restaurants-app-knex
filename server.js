'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

app.get('/restaurants', (req, res) => {
  knex('restaurants')
    .select('id', 'name', 'cuisine', 'borough')
    .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode) AS address"))
    .limit(10)
    .then(results => res.json(results));
});

app.get('/restaurants/:id', (req, res) => {
  knex.first(
    'restaurants.id', 
    'name', 
    'cuisine', 
    'borough',
    'grades.id', 
    'grade', 
    'date AS inspectionDate', 
    'score'
  ) 
    .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode) AS address"))
    .from('restaurants')
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'desc')
    .then(results => res.json(results));
});

// ADD ANSWERS HERE

app.listen(PORT);
