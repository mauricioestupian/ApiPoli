import express from 'express';

import {
    getAllPersonas,
    getPersonaById,
    createPersona,
    updatePersona,
    deletePersona,
    patchPersona,
    bulkInsertPersonas,
    bulkUpdatePersonas,
  } from '../controllers/personaController.mjs';
  

  const router = express.Router();
  router.get('/', getAllPersonas);
  router.get('/:id', getPersonaById);
  router.post('/', createPersona);
  router.put('/:id', updatePersona);
  router.patch('/:id', patchPersona);
  router.delete('/:id', deletePersona);
  router.post('/bulk', bulkInsertPersonas);
  router.put('/bulk', bulkUpdatePersonas);

  export default router;

  