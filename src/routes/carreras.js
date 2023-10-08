const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Consulta para obtener todos las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodosLasCarreras();
    response.render('carrera/listado', { carreras }); 
});

// Mostrar formulario para agregar una nueva carrera
router.get('/agregar', (request, response) => {
    response.render('carrera/agregar');
});

// Agregar una nueva carrera
router.post('/mantenimiento', async (request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };
    const resultado = await queries.insertarCarrera(nuevaCarrera);

    response.redirect('/carreras');
});

router.get('/actualizar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera);
    response.render('carreras/actualizar', { carrera }); // Cambia 'carrera' a 'carreras'
});

// Actualizar una carrera
router.post('/actualizar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const { carrera } = request.body;
    const nuevaCarrera = { carrera };

    const resultado = await queries.actualizarCarrera(idcarrera, nuevaCarrera);

    response.redirect('/carreras');
});

// Eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        console.log('Carrera eliminada con éxito');
    }
    response.redirect('/carreras');
});

module.exports = router;

