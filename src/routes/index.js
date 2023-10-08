// Este archivo sera utilizado para configurar todas las rutas principales
const express = require('express');
const router = express.Router();
const estudiantesRepository = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const profesoresRepository = require('../repositories/ProfesoresRepository');
const materiasRepository = require('../repositories/MateriasRepository'); // Agregado

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

router.get('/profesores', async (request, response) => {
    const profesores = await profesoresRepository.obtenerTodosLosProfesores();
    response.render('profesores/listado', { profesores });
});

router.get('/profesores/agregar', (request, response) => {
    response.render('profesores/agregar');
});

router.post('/profesores/agregar', async (request, response) => {
    const { idProfesor, profesor } = request.body;
    const nuevoProfesor = { idProfesor, profesor };
    const resultado = await profesoresRepository.insertarProfesor(nuevoProfesor);
    response.redirect('/profesores');
});

router.get('/actualizar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const profesor = await profesoresRepository.obtenerProfesorPorId(idProfesor);
    response.render('profesores/actualizar', { profesor });
});

router.post('/actualizar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const { profesor } = request.body;
    const nuevoProfesor = { profesor };

    const resultado = await profesoresRepository.actualizarProfesor(idProfesor, nuevoProfesor);

    response.redirect('/profesores');
});

router.get('/eliminar/:idProfesor', async (request, response) => {
    const { idProfesor } = request.params;
    const resultado = await profesoresRepository.eliminarProfesor(idProfesor);
    if (resultado > 0) {
        console.log('Profesor eliminado con éxito');
    }
    response.redirect('/profesores');
});

// Obtener todas las materias
router.get('/', async (request, response) => {
    const materias = await materiaRepository.obtenerTodasLasMaterias();
    response.render('materias/listado', { materias });
});

// Mostrar formulario para agregar una nueva materia
router.get('/agregar', (request, response) => {
    response.render('materias/agregar');
});

// Agregar una nueva materia
router.post('/agregar', async (request, response) => {
    const { idMateria, materia } = request.body;
    const nuevaMateria = { idMateria, materia };
    const resultado = await materiaRepository.insertarMateria(nuevaMateria);
    response.redirect('/materias');
});

// Mostrar formulario para actualizar una materia
router.get('/actualizar/:idMateria', async (request, response) => {
    const { idMateria } = request.params;
    const materia = await materiaRepository.obtenerMateriaPorId(idMateria);
    response.render('materias/actualizar', { materia });
});

router.get('/actualizar/:idMateria', async (request, response) => {
    const { idMateria } = request.params;
    console.log('ID de la Materia:', idMateria); // Verifica si el ID se obtiene correctamente
    const materia = await materiaRepository.obtenerMateriaPorId(idMateria);
    response.render('materias/actualizar', { materia });
});

// Actualizar una materia
router.post('/actualizar/:idMateria', async (request, response) => {
    const { idMateria } = request.params;
    const { materia } = request.body;
    const nuevaMateria = { materia };

    const resultado = await materiaRepository.actualizarMateria(idMateria, nuevaMateria);

    response.redirect('/materias');
});

// Eliminar una materia
router.get('/eliminar/:idMateria', async (request, response) => {
    const { idMateria } = request.params;
    const resultado = await materiaRepository.eliminarMateria(idMateria);
    if (resultado > 0) {
        console.log('Materia eliminada con éxito');
    }
    response.redirect('/materias');
});

module.exports = router;

