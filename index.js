require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const abmjson = require('./abmjson.js');
const fs = require('fs');
const dns = require('node:dns');
var bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

const rutaArchivo = 'urls.json';

var indice=0;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  console.log(JSON.stringify(req.body, null, 2));
  console.log("test: "+url);
    //console.log(url);
  if(abmjson.esURLValida(url)){

    const urlNoProtocol = url.split('/')[2];
    
    dns.lookup(urlNoProtocol, (err, address) => {

       if (err) {       
        console.log("url no válida");
        return res.json({ error: "Invalid Hostname" });
        }else{

    var find = abmjson.searchUrl(rutaArchivo,url);
    console.log("el valor encontrado es "+find.toString());
    if(find>0){
      res.json({original_url: url, short_url: find});
    }else{
      indice++;
      abmjson.addShortUrl(rutaArchivo,url,indice);
      res.json({original_url: url, short_url: indice}); 
    }
    }
  });

  }else{
    res.json({ error: 'Invalid URL' });
  }
  
  });

  

app.get('/api/shorturl/:short', function(req,res){
  var short_url = req.params.short;
   console.log(JSON.stringify(req.params, null, 2));
  console.log("test short: "+short_url);
  if (!isNaN(short_url)) {
  short_url = parseInt(short_url);  
  console.log(short_url);
  //busca por short
  var url = abmjson.searchShort(rutaArchivo, short_url);
  if(url != ""){
    res.redirect(301,url);
  }else{
    res.json({ error: 'Invalid URL' });
  }
  
  res.end();}
  else{
    res.json({ error: 'Invalid URL' });
  }

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
