var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var hitsCollection = db.get().collection('hits');//Inicializamos la coleccion

  hitsCollection.find().toArray(function(err, docs) {
    res.render('index', { hits: docs }); //Renderizamos la vista con la coleccion
  })
  
});

/* DELETE hits. */
router.delete('/delete/:objectID', function(req, res, next) {

  var hitsCollection = db.get().collection('hits');//Inicializamos la coleccion
  //Removemos la coleccion
  hitsCollection.remove({ objectID: req.params.objectID }, function(err, result){
    if(err)
      res.send('error');//verficamos por el error si se elimino o no.
    else
      res.send(result);
  })
});



module.exports = router;
