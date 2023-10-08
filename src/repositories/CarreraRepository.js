const pool = require('../config/databaseController');

module.exports = {

    obtenerTodosLasCarreras: async() => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    obtenerCarreraPorId: async (idcarrera) => {
        try {
            const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result[0]; // Devuelve el primer resultado (si hay alguno)
        } catch (error) {
            console.error('Error al obtener la carrera por ID', error);
            throw error; // También puedes manejar el error según tu lógica
        }
    },

    insertarCarrera: async (nuevaCarrera) => {
        try {
            const result = await pool.query('INSERT INTO carreras SET ?', [nuevaCarrera]);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar la carrera', error);
        }
    },

    actualizarCarrera: async (idcarrera, nuevaCarrera) => {
        try {
            const result = await pool.query('UPDATE carreras SET ? WHERE idcarrera = ?', [nuevaCarrera, idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la carrera', error);
        }
    },

    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la carrera', error);
        }
    }
}

