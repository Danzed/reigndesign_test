var http = require('http');
var db = require('../db/db');

var consumerApi = function(){
    var url = 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs';
    
    http.get(url, function(res){
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
            var algolia = JSON.parse(body);//Parseamos el body

            var hitsCollection = db.get().collection('hits');//Inicializamos la coleccion
            hitsCollection.remove();//Removemos lo anterior

            //Insertamos el nuevo json descargado
            hitsCollection.insert(algolia.hits, function(err, result) {
                console.log(err);
                console.log(result);
            })
            
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
}

var schedule = require('node-schedule');
//Jobs que se lanza cada 1 hora para descargar de nuevo el JSON.
var j = schedule.scheduleJob('*/60 * * * *', function(){
    consumerApi();
});

module.exports = consumerApi;
