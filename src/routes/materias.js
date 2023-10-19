const express = require('express');
const router = express.Router();
const materiaRepository = require('../repositories/MateriasRepository');

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

// Actualizar una materia
router.post('/actualizar/:idMateria', async (request, response) => {
    const { idMateria } = request.params;
    const { materia } = request.body;
    const nuevaMateria = { materia };

    const resultado = await materiaRepository.actualizarMateria(idMateria, nuevaMateria);

    response.redirect('/materias');
});
router.get('/actualizar/:idMateria', async (request, response) => {
    const { idMateria } = request.params;
    const materia = await materiaRepository.obtenerMateriaPorId(idMateria);
    console.log('Materia a actualizar:', materia); // Verifica si la materia se obtiene correctamente
    response.render('materias/actualizar', { materia });
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
