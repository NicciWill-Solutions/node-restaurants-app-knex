'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

app.get('/restaurants', (req, res) => {
  knex('restaurants')
    .select()
    .limit(10)
    .then(results => res.json(results));
});

app.get('/restaurants/:id', (req, res) => {
  knex.select(
    'restaurants.id', 
    'name', 
    'cuisine', 
    'borough',
    'grades.id', 
    'grade', 
    'date AS inspectionDate', 
    'score'
  )
    .from('restaurants')
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    //.limit(1)
    .then(results => res.json(results));
});

// ADD ANSWERS HERE

app.listen(PORT);
