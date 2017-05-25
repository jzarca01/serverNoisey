const Archetype = require('archetype-js');
//const BookType = require('./book');
//const { ObjectId } = require('mongodb');
const express = require('express');

module.exports = db => {
  const router = express.Router();

  // Wrap an async function so we catch any errors that might occur
  const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))

  // Get all devices
  router.get('/',(req, res, next) => {
    return db.collection('devices').find().toArray(function(err, results) {
      res.json(results);
      return results;
    });
  });

  router.get('/:uid',(req, res, next) => {
    return db.collection('devices').find({uid:req.params.uid}).toArray(function(err, results) {
      res.json(results);
      return results;
    });
  });

  router.post('/', (req, res, next) =>  {
    const message = {
      "message": "Coucou post"
    };
    res.status(200).json(message);
  });

  // Delete an existing Book
  /*router.delete('/:id', wrapAsync(async function(req) {
    const { result } = await db.collection('Book').deleteOne({
      _id: Archetype.to(req.params.id, ObjectId)
    })
    return { result }
  }))*/

  return router;
}