const http = require("node:http");
const puerto = 3000;
const fs = require("node:fs");


const archivo = JSON.parse(fs.readFileSync("archivo.json"));


const server = http.createServer((request, response) =>{
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE");
/*-----------------------switch-------------------------------------------------*/

    switch(request.method){
/*-----------------------GET-------------------------------------------------*/
     case "GET":
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json; charset= utf-8");
    response.end(JSON.stringify(archivo));
    break;
/*-----------------------POST-------------------------------------------------*/
    case "POST":
        var informacion = "";
        request.on("data", info =>{
            informacion += info;

        });
        request.on("end", () =>{
            const objeto_nuevoItem = JSON.parse(informacion);
            console.log(objeto_nuevoItem);
            const objeto_nuevaTarjeta = {
                id: archivo.arreglo[archivo.arreglo.length -1].id + 1,
                titulo: objeto_nuevoItem.titulo,
                descripcion: objeto_nuevoItem.descripcion,
                imagen: objeto_nuevoItem.imagen
            }
            archivo.arreglo.push(objeto_nuevaTarjeta);
            fs.writeFile("./archivo.json", JSON.stringify(archivo), err =>{
                if(err){
                    const objeto_respuesta ={
                        mensaje: "Ups Algo salio mal"
                    }
                
                    response.statusCode = 404;
                    response.setHeader("Content=Type", "application/json");
                    response.end(JSON.stringify(objeto_respuesta));

                } else{
                    const objeto_respuesta = {
                        mensaje: "Amuleto Guardad0 7w7"

                    }
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(objeto_respuesta));
                }
            });


        });
    break;
/*-----------------------PUT-------------------------------------------------*/
    case "PUT":
        var informacion = "";
        request.on("data", info =>{
            informacion += info;

        });
        request.on("end", () =>{
            const objeto_TarjetaEditada = JSON.parse(informacion);
            for(i =0; i<archivo.arreglo.length; i++){
                if(objeto_TarjetaEditada.id == archivo.arreglo[i].id){
                    archivo.arreglo[i] = objeto_TarjetaEditada;
                }
            }
            fs.writeFile("./archivo.json", JSON.stringify(archivo), err =>{
                if(err){
                    console.log(err);
                }
                else{
                    const objeto_respuesta = {
                        mensaje: "Amuleto Actualizado"
                    }
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(objeto_respuesta));


                }
            });

        });
    break;

/*-----------------------delete-------------------------------------------------*/

    case "DELETE":
        request.on("data", info =>{
            const objeto_tarjeta_borrar = JSON.parse(info);
            
            for(i =0; i< archivo.arreglo.length; i++){
                if(archivo.arreglo[i].id == objeto_tarjeta_borrar.id){
                    archivo.arreglo.splice(i, 1);
                    break;
                }
            }

           fs.writeFile("./archivo.json", JSON.stringify(archivo), err =>{
            if(err){
                console.log(err);
            }
            else{
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify({
                    mensaje: "la tarjeta de borro correctamente"
                }));
            }
           });
        });
    break;


    case "OPTIONS":
        response.writeHead(204);
        response.end();
        break;
    }

    
});

server.listen(puerto, () =>{
    console.log("Servidor a la escucha en http://localhost:" + puerto);
    
});