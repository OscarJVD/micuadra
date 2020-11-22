const express        = require('express');
const router         = express.Router();
const petController = require('../controllers/pet.controller.js');

router.get('/', petController.getPets);   // Esta ruta es el conducto para obtener las tareas
router.post('/', petController.addPet);   // Esta ruta es el conducto para añadir tarea
router.get('/:id', petController.getPet); // Esta es el conducto para traer una tarea especifica
router.put('/:id', petController.putPet); // Esta es el conducto para actualizar una tarea especifica
router.put('/:id/status', petController.putStatusPet); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.put('/:id/softdelete', petController.softDeletePet); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.delete('/:id', petController.deletePet); // Esta es el conducto para eliminar tarea especifica SoftDelete

module.exports = router; // Exportando un objeto con métodos y propiedades que se usan en