const express = require("express");
const router = express.Router();
const queries = require("../repositories/GrupoRepository");
const materiasQuery = require("../repositories/MateriasRepository"); // Agregado
const estudiantesQuery = require("../repositories/EstudianteRepository"); 
const profesoresQuery = require("../repositories/ProfesoresRepository"); // Agregado
const axios = require('axios'); // Asegúrate de tener instalada la librería 'axios'
const GrupoRepository = require('../repositories/GrupoRepository');

router.get("/", async (request, response) => {
  try {
    const grupos = await queries.obtenerTodosLosGrupos();
    response.render("grupos/listado", { grupos });
  } catch (error) {
    response.status(500).send("Ocurrió un error al obtener los grupos");
  }
});

router.get("/agregar", async (request, response) => {
  try {
    // Obtener lista de materias y profesores
    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();
    response.render("grupos/agregar", { lstMaterias, lstProfesores });
  } catch (error) {
    response
      .status(500)
      .send("Ocurrió un error al cargar el formulario de agregar");
  }
});

router.post("/agregar", async (request, response) => {
  try {
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };
    await queries.insertarGrupo(nuevoGrupo);
    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al agregar el grupo");
  }
});

router.get("/grupos/actualizar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresRepository.obtenerTodosLosProfesores();
    console.log("ID de la Materia:", grupo.idMateria);
    console.log("ID del Profesor:", grupo.idProfesor);
    response.render("actualizar", { grupo, lstMaterias, lstProfesores });
  } catch (error) {
    response
      .status(500)
      .send("Ocurrió un error al cargar el formulario de modificar");
  }
});

router.get('/asignar/:idgrupo', async (request, response) => {
  try {
      const { idgrupo } = request.params;
      
      // 1. Obtener la lista de todos los estudiantes
      const estudiantes = await estudiantesQuery.obtenerTodosLosEstudiantes();
      // 2. Obtener la información del grupo con el ID proporcionado
      const grupo = await queries.obtenerGrupoPorID(idgrupo);

      // Renderizar la plantilla asignar.hbs y pasar la lista de estudiantes y la información del grupo
      response.render('grupos/asignar', { estudiantes, grupo });
  } catch (error) {
      response.status(500).send("Ocurrió un error al mostrar la página de asignación");
  }
});


router.post("/grupos/actualizar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;

    const actualizacionGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };
    await grupoRepository.actualizarGrupo(idgrupo, actualizacionGrupo);

    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al modificar el grupo");
  }
});

router.get("/eliminar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    await queries.eliminarGrupo(idgrupo);
    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al eliminar el grupo");
  }
});

router.post("/asignar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const { idestudiante } = request.body;

    await GrupoRepository.asignarEstudianteAGrupo(idgrupo, idestudiante);

    response.redirect(`/grupos/asignar/${idgrupo}`);
  } catch (error) {
    response.status(500).send("Ocurrió un error al asignar el alumno");
  }
});


module.exports = router;
