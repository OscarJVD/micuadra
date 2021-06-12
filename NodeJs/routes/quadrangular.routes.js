const express        = require('express');
const router         = express.Router();
const quadrangularController = require('../controllers/quadrangular.controller.js');

router.get('/', quadrangularController.getQuadrangulars);   // Esta ruta es el conducto para obtener las tareas
router.get('/archived', quadrangularController.getArchivedQuadrangulars);   // Esta ruta es el conducto para obtener las tareas archivadas
router.get('/deleted', quadrangularController.getDeletedQuadrangulars);   // Esta ruta es el conducto para obtener las tareas archivadas
router.post('/', quadrangularController.addQuadrangular);   // Esta ruta es el conducto para añadir tarea
router.get('/:id', quadrangularController.getQuadrangular); // Esta es el conducto para traer una tarea especifica
router.put('/:id', quadrangularController.putQuadrangular); // Esta es el conducto para actualizar una tarea especifica
router.put('/:id/status', quadrangularController.putStatusQuadrangular); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.put('/:id/softdelete', quadrangularController.softDeleteQuadrangular); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.delete('/:id', quadrangularController.deleteQuadrangular); // Esta es el conducto para eliminar tarea especifica SoftDelete

module.exports = router; // Exportando un objeto con métodos y propiedades que se usan en