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


function searchUrl(rutaArchivo, short_url) {
    var result = "buscando";
    // Leer el archivo
    fs.readFile(rutaArchivo, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        
        try {
            // Convertir el contenido del archivo en un array de objetos JSON
            const urls = JSON.parse(data);

             // Iterar sobre cada objeto JSON
             urls.forEach(function(url) {
                // Llamar a la función de devolución de llamada con cada objeto JSON y su índice
                if(url.short_url==short_url){
                    result=url.original_url;
                    console.log(result);
                }                                   
            });
            return result;
        } catch (parseError) {
            console.log(parseError);
        }
    });
}

function esURLValida(url) {
    try {
        // Intenta crear una nueva instancia de URL
        new URL(url);
        return true; // La URL es válida
    } catch (error) {
        return false; // La URL no es válida
    }
}

module.exports = { 
    esURLValida: esURLValida,
    searchUrl: searchUrl,
    addShortUrl: addShortUrl
}