// Este archivo sera utilizado para configurar todas las rutas principales

const express = require('express');

const router = express.Router();

const estudiantesRepository = require('../repositories/EstudianteRepository');

const carrerasQuery = require('../repositories/CarreraRepository');

 

// Mostrar todos los estudiantes

router.get('/', async (request, response) => {

    const estudiantes = await estudiantesRepository.obtenerTodosLosEstudiantes();

    response.render('estudiantes/listado', { estudiantes });

});

 

// Mostrar formulario para agregar un nuevo estudiante

router.get('/agregar', async(request, response) => {

    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

    response.render('estudiantes/agregar', { lstCarreras });

});

 

// Agregar un estudiante

router.post('/agregar', async(request, response) => {

    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;

    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await estudiantesRepository.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');

});

 

// Eliminar un estudiante

router.get('/eliminar/:idestudiante', async(request, response) => {

    const { idestudiante } = request.params;

    const resultado = await estudiantesRepository.eliminarEstudiante(idestudiante);

    if(resultado > 0){

        console.log('Eliminado con éxito');

    }

    response.redirect('/estudiantes');

});

// Mostrar formulario para actualizar un estudiante

router.get('/actualizar/:idestudiante', async (request, response) => {

    const { idestudiante } = request.params;

    const estudiante = await estudiantesRepository.obtenerEstudiantePorId(idestudiante);

    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

    response.render('estudiantes/actualizar', { estudiante, lstCarreras });

});

 

// Actualizar un estudiante

router.post('/actualizar/:idestudiante', async (request, response) => {

    const { idestudiante } = request.params;

    const { nombre, apellido, email, idcarrera, usuario } = request.body;

    const nuevoEstudiante = { nombre, apellido, email, idcarrera, usuario };

 

    const resultado = await estudiantesRepository.actualizarEstudiante(idestudiante, nuevoEstudiante);

 

    if (resultado) {

        console.log('Estudiante actualizado con éxito');

    }

    response.redirect('/estudiantes');

});

 

// Mostrar todos las carreras

router.get('/carreras', async (request, response) => {

    const carreras = await carrerasQuery.obtenerTodosLasCarreras();

    response.render('carreras/listado', { carreras });

});

 

// Mostrar formulario para agregar una nueva carrera

router.get('/carreras/agregar', (request, response) => {

    response.render('carreras/agregar');

});

 

// Agregar una carrera

router.post('/carreras/agregar', async(request, response) => {

    const { idcarrera, carrera } = request.body;

    const nuevaCarrera = { idcarrera, carrera };

    const resultado = await carrerasQuery.insertarCarrera(nuevaCarrera);

    response.redirect('/carreras');

});

 

// Eliminar una carrera

router.get('/carreras/eliminar/:idcarrera', async(request, response) => {

    const { idcarrera } = request.params;

    const resultado = await carrerasQuery.eliminarCarrera(idcarrera);

    if(resultado > 0){

        console.log('Carrera eliminada con éxito');

    }

    response.redirect('/carreras');

});

module.exports = router;

