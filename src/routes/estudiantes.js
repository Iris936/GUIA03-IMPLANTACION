const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

 

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes

});

// Endpoint que permite mostrar el formulario para actualizar un estudiante
router.get('/actualizar/:idestudiante', async (request, response) => {
    try {

        const { idestudiante } = request.params;
        const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
        const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

        response.render('estudiantes/actualizar', { estudiante, lstCarreras });

    } catch (error) {
        console.error('Error al obtener el estudiante por ID', error);
    }

});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    response.render('estudiantes/agregar', {lstCarreras});

});

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {

    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };
    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');

});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {

    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);

    if(resultado > 0){
        console.log('Eliminado con éxito');

    }
    response.redirect('/estudiantes');

});

// Endpoint que permite mostrar el formulario para actualizar un estudiante
router.get('/actualizar/:idestudiante', async (request, response) => {

    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

    response.render('estudiantes/actualizar', { estudiante, lstCarreras });

});

 

// Endpoint para actualizar un estudiante
router.post('/actualizar/:idestudiante', async (request, response) => {

    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.actualizarEstudiante(idestudiante, nuevoEstudiante);

    if (resultado) {
        console.log('Estudiante actualizado con éxito');
    }

    response.redirect('/estudiantes');
});

module.exports = router;

 

 