const express = require('express');
const router = express.Router();
const Album = require('../model/Album.model.js');

// Création d'un nouvel Album 
router.put('/',(req,res) => {
  if (!req.body.Title) {
    return res.status(400).send({
      message: 'Title ne peut pas être vide'
    });
  }
  if (!req.body.Release) {
    return res.status(400).send({
      message: 'Release ne peux pas être vide'
    });
  }
  if (!req.body.Genre) {
    return res.status(400).send({
      message: 'Genre ne peut pas être vide'
    });
  }
  if (!req.body.Cover_URL) {
    return res.status(400).send({
      message: 'La converture ne peut pas être vide'
    });
  }

  // création d'un Album
  const album = new Album({
    Title: req.body.Nom,
    Release: req.body.Release,
    Genre: req.body.Genre,
    Cover_URL: req.body.Cover_URL || ''
  });

  // sauvegarde dans la DB
  album
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(iferreur => {
      res.status(500).send({
        message: iferreur.message || 'Impossible de créer l album'
      });
    });
});


/* Affichage des albums*/
router.get('/',(req,res) => {
  Album.find()
  .then(function(Albums){
  	  res.send(Albums);
  })
  .catch(iferreur=>{
  	  res.status(500).send({
	  	  message: iferreur.message || 'albums non trouvés'
	  });
  });
});

// Recherche d'un album par ID
router.get('/:id',(req,res) => {
  Album.findById(req.params.id)
    .then(album => {
      if (!album) {
        return res.status(404).send({
          message: 'Album n ' + req.params.id + ' non trouvé'
        });
      }
      res.send(album);
    })
    .catch(iferreur => {
      if (iferreur.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album n  ' + req.params.id + ' non trouvé'
        });
      }
      return res.status(500).send({
        message: 'impossible de trouver l Album n ' + req.params.Id
      });
    });
});

//modification
router.post('/:id',(req,res) => {
  // Validate Request
  if (!req.body.Title) {
    return res.status(400).send({
      message: 'Name ne peut pas être vide'
    });
  }

  // Trouver un utilisateur pour le modifier 
  Album.findByIdAndUpdate(
    req.params.id,
    {
        Title: req.body.Title,
        Release: req.body.Release,
        Genre: req.body.Genre,
        Cover_URL: req.body.Cover_URL || ''
    },
    { new: true }
  )
  .then(album => {
    if (!album) {
      return res.status(404).send({
        message: 'Album n ' + req.params.id + ' non trouvé'
      });
    }
    res.send(album);
  })
  .catch(iferreur => {
    if (iferreur.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Album n  ' + req.params.id + ' non trouvé'
      });
    }
      return res.status(500).send({
        message: 'impossible de trouver l album n ' + req.params.id
      });
    });
});

//Supression
router.delete('/:id',(req,res) => {
  Album.findByIdAndRemove(req.params.id)
  .then(album => {
    if (!album) {
      return res.status(404).send({
        message: 'Album n ' + req.params.id + ' non trouvé'
      });
    }
    res.send(album);
  })
  .catch(iferreur => {
    if (iferreur.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Album n  ' + req.params.id + ' non trouvé'
      });
    }
      return res.status(500).send({
        message: 'impossible de trouver l album n ' + req.params.id
      });
    });
});

module.exports = router;