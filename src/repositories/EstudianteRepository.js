const pool = require('../config/databaseController');

 

module.exports = {
    obtenerTodosLosEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT * FROM estudiante');
            return result;

        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de estudiantes: ', error);

        }

    },

    obtenerEstudiantePorId: async (idestudiante) => {
        try {
            const result = await pool.query('SELECT * FROM estudiante WHERE idestudiante = ?', [idestudiante]);
            return result[0]; 
        } catch (error) {
            console.error('Error al obtener el estudiante por ID', error);
            throw error; 

        }

    },

    eliminarEstudiante: async(idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiante WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;

        } catch (error) {
            console.error('Error al eliminar el registro', error);

        }

    },

    insertarEstudiante: async(nuevoEstudiante) => {
        try {
            const result = await pool.query("INSERT INTO estudiante SET ? ", nuevoEstudiante);
            return result.insertId;

        } catch (error) {
            console.error('Error al insertar el registro', error);

        }

    },
    
    actualizarEstudiante: async (idestudiante, nuevoEstudiante) => {
        try {
            const result = await pool.query('UPDATE estudiante SET ? WHERE idestudiante = ?', [nuevoEstudiante, idestudiante]);
            return result.affectedRows > 0;

        } catch (error) {
            console.error('Error al actualizar el estudiante', error);

        }

    }

};

