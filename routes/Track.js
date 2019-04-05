const express = require('express');
const router = express.Router();
const Track = require('../model/Track.model.js');

// Création d'une nouvelle Track 
router.put('/',(req,res) => {
  if (!req.body.Title) {
    return res.status(400).send({
      message: 'Title ne peut pas être vide'
    });
  }
  if (!req.body.Duration) {
    return res.status(400).send({
      message: 'Duration ne peux pas être vide'
    });
  }
  if (!req.body.Listening) {
    return res.status(400).send({
      message: 'Listening ne peut pas être vide'
    });
  }
  if (!req.body.Likes) {
    return res.status(400).send({
      message: 'Les Likes ne peuvent pas être vides'
    });
  }

  // création d'une track
  const track = new Track({
    Title: req.body.Nom,
    Duration: req.body.Duration,
    Listening: req.body.Listening,
    Likes: req.body.Likes || ''
  });

  // sauvegarde dans la DB
  track
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(iferreur => {
      res.status(500).send({
        message: iferreur.message || 'Impossible de créer la track'
      });
    });
});


 //Affichage des tracks
router.get('/',(req,res) => {
  Track.find()
  .then(function(Tracks){
  	  res.send(Tracks);
  })
  .catch(iferreur=>{
  	  res.status(500).send({
	  	  message: iferreur.message || 'tracks non trouvés'
	  });
  });
});

// Recherche d'une track par ID
router.get('/:id',(req,res) => {
  Track.findById(req.params.id)
    .then(track => {
      if (!track) {
        return res.status(404).send({
          message: 'Track n ' + req.params.id + ' non trouvé'
        });
      }
      res.send(track);
    })
    .catch(iferreur => {
      if (iferreur.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track n  ' + req.params.id + ' non trouvé'
        });
      }
      return res.status(500).send({
        message: 'impossible de trouver la Track n ' + req.params.id
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
  Track.findByIdAndUpdate(
    req.params.id,
    {
        Title: req.body.Nom,
         Duration: req.body.Duration,
        Listening: req.body.Listening,
         Likes: req.body.Likes || ''
    },
    { new: true }
  )
  .then(track => {
    if (!track) {
      return res.status(404).send({
        message: 'Track n ' + req.params.id + ' non trouvé'
      });
    }
    res.send(track);
  })
  .catch(iferreur => {
    if (iferreur.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Track n  ' + req.params.id + ' non trouvé'
      });
    }
      return res.status(500).send({
        message: 'impossible de trouver la track n ' + req.params.id
      });
    });
});

//Supression
router.delete('/:id',(req,res) => {
  Track.findByIdAndRemove(req.params.id)
  .then(track => {
    if (!track) {
      return res.status(404).send({
        message: 'Track n ' + req.params.id + ' non trouvé'
      });
    }
    res.send(track);
  })
  .catch(iferreur => {
    if (iferreur.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Track n  ' + req.params.id + ' non trouvé'
      });
    }
      return res.status(500).send({
        message: 'impossible de trouver la track n ' + req.params.id
      });
    });
});

module.exports = router;