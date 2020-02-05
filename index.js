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

api.use( express.urlencoded({ extended : false }) )
api.use( express.json() )


//Almacenamiento de datos...
const peliculas = easyDB({
    database: '469001d5-05ec-454f-b2cc-32a4e26ee281',
    token: 'd53d323a-5276-4ecd-8820-1494a31f0534'
})

//Endpoint
api.get("/api/peliculas", function(request, response){

    let listado = peliculas.get("pelicula", function(error, pelicula){
        
        let rta = error ? { rta : "error", message : error} : peliculas

        response.json( rta )
    })

})
api.post("/api/peliculas", function(request, response){

    let pelicula = request.body

    pelicula.id = new Date().valueOf()

    peliculas.put( "pelicula", pelicula, function(error){
        response.json({ rta : "error", message : error})
    })
     
    
    response.json({rta : "ok", message : "Pelicula creada"})
})
api.put("/api/peliculas/:id", function(request, response){

    let elID = request.params.id

    let datos = request.body

    let laPelicula = peliculas.find (function(pelicula){

        return pelicula.id == elID
            
        

    })
    laPelicula.titulo = datos.titulo || laPelicula.titulo
    laPelicula.estreno = datos.estreno || laPelicula.estreno
    laPelicula.descripcion = datos.descripcion || laPelicula.descripcion
    laPelicula.poster = datos.poster || laPelicula.poster
    laPelicula.trailer = datos.trailer || laPelicula.trailer


    response.json({ rta : "ok", pelicula : laPelicula})
})
api.delete("/api/peliculas/:id", function(request, response){
    response.end("Aca voy a borrar la pelicula: " + request.params.id)
})

//tarea armar titulo que pida año de estreno, poster, descripcion, titulo y un trailer
// (crear carpeta public)boludo