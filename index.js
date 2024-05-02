require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const abmjson = require('./abmjson.js');
const fs = require('fs');
const dns = require('dns');
var bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

const rutaArchivo = 'urls.json';

var indice=0;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function esValido(hostname){ 
  var result;
  dns.lookup(url, (err, addresses, family) => {
    if (err) {
        console.error('Error al buscar la dirección IP:', err);
        result="";
        return;
    }else{
    // Asignar la dirección IP a la variable
    result = addresses;
    
    // Puedes usar la dirección IP aquí dentro de esta función de devolución de llamada
    console.log('Dirección IP:', direccionIP);
    } 
  });

  return result;
}

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl', function(req, res) {
  const url = req.body.url_input;
  console.log(url);
  if(abmjson.esURLValida(url)){
  indice++;
  abmjson.addShortUrl(rutaArchivo,url,indice);
  res.json({'original_url': url, 'short_url': indice});

  }else{
    res.json({ error: 'invalid url' });
  }
  
  });

  

app.get('/api/shorturl/:short', function(req,res){
  const short_url = req.params.short;
  console.log(short_url);
  //busca por short
  var url = abmjson.searchUrl(rutaArchivo, short_url);
  //url=new URL();
  res.redirect("https://google.com");
  res.end();

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
