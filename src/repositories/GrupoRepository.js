const pool = require("../config/databaseController");

module.exports = {
  obtenerTodosLosGrupos: async () => {
    try {
      const result = await pool.query("SELECT * FROM grupos");
      return result;
    } catch (error) {
      console.error(
        "Ocurrió un problema al consultar la lista de grupos: ",
        error
      );
      throw error;
    }
  },

  eliminarGrupo: async (idgrupo) => {
    try {
      const result = await pool.query("DELETE FROM grupos WHERE idgrupo = ?", [
        idgrupo,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar el registro", error);
      throw error;
    }
  },

  insertarGrupo: async (nuevogrupo) => {
    try {
      const result = await pool.query("INSERT INTO grupos SET ?", nuevogrupo);
      return result.insertId;
    } catch (error) {
      console.error("Error al insertar el registro", error);
      throw error;
    }
  },

  actualizarGrupo: async (idgrupo, actualizacion) => {
    try {
      const resultado = await pool.query(
        "UPDATE grupos SET ? WHERE idgrupo = ?",
        [actualizacion, idgrupo]
      );
      return resultado.affectedRows > 0;
    } catch (error) {
      console.log("Error al actualizar grupo", error);
      throw error;
    }
  },

  obtenerGrupoPorID: async (idgrupo) => {
    try {
      const [grupo] = await pool.query(
        "SELECT * FROM grupos WHERE idgrupo = ?",
        [idgrupo]
      );
      return grupo;
    } catch (error) {
      console.log(
        "Ocurrió un problema al obtener información del grupo",
        error
      );
      throw error;
    }
  },
  obtenerTodosLosGrupos: async () => {
    try {
      const result = await pool.query("SELECT * FROM grupos");
      return result;
    } catch (error) {
      console.error(
        "Ocurrió un problema al consultar la lista de grupos: ",
        error
      );
      throw error;
    }
  },

  actualizarGrupo: async (idgrupo, actualizacion) => {
    try {
      const resultado = await pool.query(
        "UPDATE grupos SET ? WHERE idgrupo = ?",
        [actualizacion, idgrupo]
      );
      return resultado.affectedRows > 0;
    } catch (error) {
      console.log("Error al actualizar grupo", error);
      throw error;
    }
  },

  obtenerGrupoPorID: async (idgrupo) => {
    try {
      const [grupo] = await pool.query(
        "SELECT * FROM grupos WHERE idgrupo = ?",
        [idgrupo]
      );
      return grupo;
    } catch (error) {
      console.log(
        "Ocurrió un problema al obtener información del grupo",
        error
      );
      throw error;
    }
  },
   // Obtener la lista de todos los estudiantes
   obtenerTodosLosEstudiantes: async () => {
    try {
      const result = await pool.query("SELECT * FROM estudiantes");
      return result;
    } catch (error) {
      console.error(
        "Ocurrió un problema al consultar la lista de estudiantes: ",
        error
      );
      throw error;
    }
  },

  asignarEstudianteAGrupo: async (idgrupo, idestudiante) => {
    try {
      const result = await pool.query(
        "INSERT INTO grupo_estudiantes (idgrupo, idestudiante) VALUES (?, ?)",
        [idgrupo, idestudiante]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error al asignar el estudiante al grupo", error);
      throw error;
    }
  },

  // Eliminar un estudiante de un grupo
  eliminarEstudianteDeGrupo: async (idgrupoestudiante) => {
    try {
      const result = await pool.query(
        "DELETE FROM grupo_estudiantes WHERE idgrupoestudiante = ?",
        [idgrupoestudiante]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar el estudiante del grupo", error);
      throw error;
    }
  },

};
