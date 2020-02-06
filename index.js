/*
- API RESTFUL: PELICULAS

http://localhost/api/peliculas

- GET: (/ o /14) Obtener todas o una pelicula puntual
- POST: (/) Recibe y genera una nueva pelicula
- PUT:(/14) Recibe y Actualiza una pelicula puntual
- DELETE: (/14) Recibe y borra una pelicula puntual
*/
const express = require("express")
const easyDB = require("easydb-io")

const api = express()

api.listen(80)

api.use( express.urlencoded({ extended : true }) )
api.use( express.json() )


//Almacenamiento de datos...
const peliculas = easyDB({
    database: '3ea8edfa-b0ab-425d-9465-83bec10876f0',
    token: '8edb561e-fb00-46a2-adf5-d709e2627166'
})

//Endpoint
api.get("/api/peliculas/:id?", function(request, response){

    let elID = request.params.id

    if( !elID ){//<-- SI NO ESPECIFICO UN ID 

        peliculas.list(function(error, listado){
           let rta = error ? { rta : "error", error } : listado

           response.json( rta )
        })
        
    } else { //<-- SI EFECTIVAMENTE ESPECIFICO UN ID
        
        peliculas.get( elID, function(error, pelicula){
            
            let rta = error ? { rta : "error", error} : pelicula
    
            response.json( rta )
        })
    }


})
api.post("/api/peliculas", function(request, response){

    let pelicula = request.body

    let id = new Date().valueOf()

    peliculas.put( id, pelicula, function(error){
        response.json({ rta : "error", message : error})
    })
     
    
    response.json({rta : "ok", message : "Pelicula creada", id})
})
api.put("/api/peliculas/:id", function(request, response){

    let elID = request.params.id

    if( !elID ){
        response.json({ rta : "error", message : "ID no especificado"})
    } else {
        
        let datos = request.body

        peliculas.put(elID, datos, function(error, value){

            let rta = error ? { rta: "error",error } : {rta : "ok", message : "Pelicula actualizada", id : elID}

            response.json({ rta })
        })
    }


    let laPelicula = peliculas.find (function(pelicula){

        return pelicula.id == elID
            
        

    })
    /*laPelicula.titulo = datos.titulo || laPelicula.titulo
    laPelicula.estreno = datos.estreno || laPelicula.estreno
    laPelicula.descripcion = datos.descripcion || laPelicula.descripcion
    laPelicula.poster = datos.poster || laPelicula.poster
    laPelicula.trailer = datos.trailer || laPelicula.trailer*/


})
api.delete("/api/peliculas/:id", function(request, response){

    let elID = request.params.id

    peliculas.delete(elID, function(error){
        response.json({ rta : "error", error})
    })

    response.json({ rta : "ok", message : "eliminaste la pelicula, maquina!", id : elID})
})

//tarea armar titulo que pida año de estreno, poster, descripcion, titulo y un trailer
// (crear carpeta public)boludo