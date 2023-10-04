const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

 
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); 

});


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

router.get('/agregar', async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    response.render('estudiantes/agregar', {lstCarreras});

});


router.post('/agregar', async(request, response) => {

    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };
    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');

});


router.get('/eliminar/:idestudiante', async(request, response) => {

    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);

    if(resultado > 0){
        console.log('Eliminado con éxito');

    }
    response.redirect('/estudiantes');

});


router.get('/actualizar/:idestudiante', async (request, response) => {

    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

    response.render('estudiantes/actualizar', { estudiante, lstCarreras });

});

 
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

 

 