/*
- API RESTFUL: PELICULAS

http://localhost/api/peliculas

- GET: (/ o /14) Obtener todas o una pelicula puntual
- POST: (/) Recibe y genera una nueva pelicula
- PUT:(/14) Recibe y Actualiza una pelicula puntual
- DELETE: (/14) Recibe y borra una pelicula puntual
*/
const express = require("express")
const bodyParser = require("body-parser")

const api = express()

api.listen(80)

//Endpoint
api.get("/api/peliculas", function(request, response){
    response.end("Aca voy a mostrar peliculas")
})
api.post("/api/peliculas", function(request, response){
    response.end("Aca voy a crear peliculas")
})
api.put("/api/peliculas", function(request, response){
    response.end("Aca voy actualizar peliculas")
})
api.delete("/api/peliculas", function(request, response){
    response.end("Aca voy a borrar peliculas")
})

//tarea armar titulo quepida anio de estreno, poster, descripcion, titulo y un trailer
// (crear carpeta public)boludo