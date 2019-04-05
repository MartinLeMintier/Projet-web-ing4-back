const express = require('express');
const router = express.Router();
const Artist = require('../model/Artist.model.js');

// Création d'un nouvel artiste 
router.put('/',(req,res) => {
  // Vérification
  if (!req.body.Nom) {
    return res.status(400).send({
      message: 'Nom ne peut pas être vide'
    });
  }
  if (!req.body.Birth) {
    return res.status(400).send({
      message: 'Birth ne peux pas être'
    });
  }
  if (!req.body.Followers) {
    return res.status(400).send({
      message: 'followers ne peut pas être vide'
    });
  }

  // création d'un artiste
  const artist = new Artist({
    Name: req.body.Nom,
    Birth: req.body.Birth,
    Followers: req.body.Followers || ''
  });

  // sauvegarde dans la DB
  artist
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(iferreur => {
      res.status(500).send({
        message: iferreur.message || 'Impossible de créer l artiste'
      });
    });
});


/* Affichage des artistes*/
router.get('/',(req,res) => {
  Artist.find()
  .then(function(Artists){
  	  res.send(Artists);
  })
  .catch(iferreur=>{
  	  res.status(500).send({
	  	  message: iferreur.message || 'Artistes non trouvés'
	  });
  });
});

// Recherche d'un artist par ID
router.get('/:id',(req,res) => {
  Artist.findById(req.params.id)
    .then(artist => {
      console.log(artist);
      if (!artist) {
        return res.status(404).send({
          message: 'Artiste n ' + req.params.id + ' non trouvé'
        });
      }
      res.send(artist);
    })
    .catch(iferreur => {
      if (iferreur.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist n  ' + req.params.id + ' non trouvé'
        });
      }
      return res.status(500).send({
        message: 'impossible de trouver l artist n ' + req.params.id
      });
    });
});

//modification
router.post('/:id',(req,res) => {
  // Validate Request
  if (!req.body.Nom) {
    return res.status(400).send({
      message: 'Name ne peut pas être vide'
    });
  }

  // Trouver un utilisateur pour le modifier 
  Artist.findByIdAndUpdate(
    req.params.id,
    {
      Name: req.body.Nom,
      Birth: req.body.Birth,
      Followers: req.body.Followers || ''
    },
    { new: true }
  )
  .then(artist => {
    if (!artist) {
      return res.status(404).send({
        message: 'Artiste n ' + req.params.id + ' non trouvé'
      });
    }
    res.send(artist);
  })
  .catch(iferreur => {
    if (iferreur.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Artist n  ' + req.params.id + ' non trouvé'
      });
    }
      return res.status(500).send({
        message: 'impossible de trouver l artist n ' + req.params.id
      });
    });
});

//Supression
router.delete('/:id',(req,res) => {
  Artist.findByIdAndRemove(req.params.id)
  .then(artist => {
    if (!artist) {
      return res.status(404).send({
        message: 'Artiste n ' + req.params.id + ' non trouvé'
      });
    }
    res.send(artist);
  })
  .catch(iferreur => {
    if (iferreur.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Artist n  ' + req.params.id + ' non trouvé'
      });
    }
      return res.status(500).send({
        message: 'impossible de trouver l artist n ' + req.params.id
      });
    });
});

module.exports = router;