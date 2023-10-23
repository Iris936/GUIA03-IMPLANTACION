const express = require('express');
const router = express.Router();
const profesoresRepository = require('../repositories/ProfesoresRepository');

// Agrega esta función para formatear la fecha
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

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
    const { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email };
    const resultado = await profesoresRepository.insertarProfesor(nuevoProfesor);

    if (resultado) {

        request.flash('error', 'Ocurrió un problema al guardar el registro ');

        console.log('ok');

    } else {

        request.flash('success', 'Registro insertado con éxito');

        console.log('ok1');

    }

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
    const { profesor, apellido, fechanacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { profesor, apellido, fechanacimiento, profesion, genero, email };

    const resultado = await profesoresRepository.actualizarProfesor(idProfesor, nuevoProfesor);
    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }

    response.redirect('/profesores');
});

// Eliminar un profesor
router.get('/eliminar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const resultado = await profesoresRepository.eliminarProfesor(idProfesor);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/profesores');
});

module.exports = router;

