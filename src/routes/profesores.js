const express = require('express');
const router = express.Router();
const profesoresRepository = require('../repositories/ProfesoresRepository');

// Obtener todos los profesores
router.get('/', async (request, response) => {
    const profesores = await profesoresRepository.obtenerTodosLosProfesores();
    response.render('profesores/listado', { profesores });
});

// Mostrar formulario para agregar un nuevo profesor
router.get('/agregar', (request, response) => {
    response.render('profesores/agregar');
});

// Agregar un nuevo profesor
router.post('/agregar', async (request, response) => {
    const { idProfesor, profesor } = request.body;
    const nuevoProfesor = { idProfesor, profesor };
    const resultado = await profesoresRepository.insertarProfesor(nuevoProfesor);
    response.redirect('/profesores');
});

// Mostrar formulario para actualizar un profesor
router.get('/actualizar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const profesor = await profesoresRepository.obtenerProfesorPorId(idProfesor);
    response.render('profesores/actualizar', { profesor });
});

// Actualizar un profesor
router.post('/actualizar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const { profesor } = request.body;
    const nuevoProfesor = { profesor };

    const resultado = await profesoresRepository.actualizarProfesor(idProfesor, nuevoProfesor);

    response.redirect('/profesores');
});

// Eliminar un profesor
router.get('/eliminar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const resultado = await profesoresRepository.eliminarProfesor(idProfesor);
    if (resultado > 0) {
        console.log('Profesor eliminado con éxito');
    }
    response.redirect('/profesores');
});

module.exports = router;
