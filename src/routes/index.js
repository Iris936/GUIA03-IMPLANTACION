// Este archivo sera utilizado para configurar todas las rutas principales
const express = require('express');
const router = express.Router();
const estudiantesRepository = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const profesoresRepository = require('../repositories/ProfesoresRepository');
const materiasRepository = require('../repositories/MateriasRepository'); // Agregado
const grupoRepository = require('../repositories/GrupoRepository');
const materiasQuery = require('../repositories/MateriasRepository'); // Agregado
const profesoresQuery = require('../repositories/ProfesoresRepository'); // Agregado


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
    const { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email };
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
// Obtener todos los grupos
router.get('/grupos', async (request, response) => {
    const grupos = await grupoRepository.obtenerTodosLosGrupos();
    response.render('grupos/listado', { grupos });
});

// Mostrar formulario para agregar un nuevo grupo
router.get('/grupos/agregar', async(request, response) => {
    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();  // Cambiado de materiasQuery a materiasRepository
    const lstProfesores = await profesoresRepository.obtenerTodosLosProfesores();
    response.render('grupos/agregar', { lstMaterias, lstProfesores });
});

// Agregar un grupo
router.post('/grupos/agregar', async(request, response) => {
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };
    const resultado = await grupoRepository.insertarGrupo(nuevoGrupo);  // Cambiado de queries a grupoRepository
    response.redirect('/grupos');
});

// Actualizar un grupo
router.post('/grupos/actualizar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;
    const actualizacionGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };

    const resultado = await grupoRepository.actualizarGrupo(idgrupo, actualizacionGrupo);

    response.redirect('/grupos');
});

router.get('/grupos/actualizar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
    console.log("mira la wea del objeto grupo : " + grupo.idMateria + " profesor¨: " + grupo.idProfesor);
    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresRepository.obtenerTodosLosProfesores();
    console.log("Lista de Materias:", lstMaterias);
    console.log("Lista de Profesores:", lstProfesores);
    response.render('grupos/actualizar', { grupo, lstMaterias, lstProfesores });
});

// Eliminar un grupo
router.get('/grupos/eliminar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const resultado = await grupoRepository.eliminarGrupo(idgrupo);
    if (resultado > 0) {
        console.log('Grupo eliminado con éxito');
    }
    response.redirect('/grupos');
});

//Asignar
router.get('/grupos/asignar/:idgrupo', async (request, response) => {
    try {
      const { idgrupo } = request.params;
  
      // 1. Obtener la lista de todos los estudiantes
      const estudiantes = await grupoRepository.obtenerTodosLosEstudiantes();
  
      // 2. Obtener la información del grupo con el ID proporcionado
      const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
  
      // Renderizar la plantilla asignar.hbs y pasar la lista de estudiantes y la información del grupo
      response.render('grupos/asignar', { estudiantes, grupo });
    } catch (error) {
      response.status(500).send("Ocurrió un error al mostrar la página de asignación");
    }
  });

  router.post('/grupos/asignar/:idgrupo', async (request, response) => {
    try {
      const { idgrupo } = request.params;
      const { idestudiante } = request.body;
  
      const resultado = await grupoRepository.asignarEstudianteAGrupo(idgrupo, idestudiante);
  
      if (resultado) {
        console.log('Estudiante asignado al grupo con éxito');
      } else {
        console.log('No se pudo asignar al estudiante al grupo');
      }
  
      response.redirect(`/grupos/asignar/${idgrupo}`);
    } catch (error) {
      response.status(500).send("Ocurrió un error al asignar el alumno");
    }
  });

module.exports = router;
