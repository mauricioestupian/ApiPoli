import pool from "../database/connection.mjs";


// Obtener todos los registros
export const getAllPersonas = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM persona');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  // Obtener un registro por ID
export const getPersonaById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM persona WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  
// Crear un nuevo registro
export const createPersona = async (req, res) => {
    const { identificacion, nombre, apellido, email, telefono, direccion } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO persona (identificacion, nombre, apellido, email, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)',
        [identificacion, nombre, apellido, email, telefono, direccion]
      );
      res.status(201).json({ id: result[0].insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Actualizar un registro PUT
export const updatePersona = async (req, res) => {
    const { id } = req.params;
    const { identificacion, nombre, apellido, email, telefono, direccion } = req.body;
    try {
      const result = await pool.query(
        'UPDATE persona SET identificacion = ?, nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?',
        [identificacion, nombre, apellido, email, telefono, direccion, id]
      );
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      res.json({ message: 'Persona actualizada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Eliminar un registro DELETE
export const deletePersona = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM persona WHERE id = ?', [id]);
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      res.status(204).send(); // Devuelve un código 204 sin contenido
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualización parcial (PATCH)
export const patchPersona = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Solo envía los campos que quieres actualizar
    try {
      const result = await pool.query('UPDATE persona SET ? WHERE id = ?', [updates, id]);
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      res.json({ message: 'Persona actualizada parcialmente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  // Inserción masiva
export const bulkInsertPersonas = async (req, res) => {
    const personas = req.body; // Array de personas
    try {
      const values = personas.map(({ identificacion, nombre, apellido, email, telefono, direccion }) => [
        identificacion,
        nombre,
        apellido,
        email,
        telefono,
        direccion,
      ]);

      //VALIDACIONES?
      const result = await pool.query(
        'INSERT INTO persona (identificacion, nombre, apellido, email, telefono, direccion) VALUES ?',
        [values]
      );
      res.status(201).json({ insertedRows: result[0].affectedRows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualización masiva
export const bulkUpdatePersonas = async (req, res) => {
    const personas = req.body; // Array de objetos con ID y campos a actualizar
    try {
      for (const { id, ...fields } of personas) {
        await pool.query('UPDATE persona SET ? WHERE id = ?', [fields, id]);
      }
      res.json({ message: 'Personas actualizadas masivamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  