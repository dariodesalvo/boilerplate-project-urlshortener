const { log } = require('console');
const fs = require('fs');


function addShortUrl(rutaArchivo, url,indice) {
    // Leer el archivo
    fs.readFile(rutaArchivo, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        // Eliminar el último carácter del contenido
        var parsed = JSON.parse(data);
        parsed.push({"original_url": url, "short_url": indice})
        const nuevoContenido = JSON.stringify(parsed);
        // Sobrescribir el archivo con el nuevo contenido
        fs.writeFile(rutaArchivo, nuevoContenido, (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
          });
    });
 
}


function searchUrl(rutaArchivo, url_buscada) {
    var result = 0;
    
    // Leer el archivo
    let rawdata = fs.readFileSync(rutaArchivo);
    let datos = JSON.parse(rawdata);

    for (let i = 0; i < datos.length; i++) {
        
        if (datos[i].original_url === url_buscada) {
            result = datos[i].short_url;
            break; 
        }
    }

    return result;
}

function searchShort(rutaArchivo, short_url_buscada) {
    var result = "";
    
    // Leer el archivo
    let rawdata = fs.readFileSync(rutaArchivo);
    let datos = JSON.parse(rawdata);

    for (let i = 0; i < datos.length; i++) {
        
        if (datos[i].short_url === short_url_buscada) {
            result = datos[i].original_url;
            break; 
        }
    }
    console.log("url encontrada: "+result);
    return result;
}

function esURLValida(url) {
    //const urlRegex = /^https?\:\/\/([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]+\/?[\w\/\-\.\_\~\!\$\&\'\(\)\*\+\,\;\=\:\@\%]+?$/
    const urlRegex = /^https?\:\/\/([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]+(?:\/(?:(?:[\w\/\-\.\_\~\!\$\&\'\(\)\*\+\,\;\=\:\@\%]|(?:%[A-Fa-f0-9]{2})))+)?(?:\?(?:(?:[\w\/\-\.\_\~\!\$\&\'\(\)\*\+\,\;\=\:\@\%\?]|(?:%[A-Fa-f0-9]{2})))+)?$/;
    const validation = urlRegex.test(url)
    return validation
}

module.exports = { 
    esURLValida: esURLValida,
    searchUrl: searchUrl,
    searchShort: searchShort,
    addShortUrl: addShortUrl
}