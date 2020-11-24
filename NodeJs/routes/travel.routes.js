const express        = require('express');
const router         = express.Router();
const travelController = require('../controllers/travel.controller.js');

router.get('/', travelController.getTravels);   // Esta ruta es el conducto para obtener las tareas
router.get('/archived', travelController.getArchivedTravels);   // Esta ruta es el conducto para obtener las tareas archivadas
router.get('/deleted', travelController.getDeletedTravels);   // Esta ruta es el conducto para obtener las tareas archivadas
router.get('/premium', travelController.getPremiumTravels);   // Esta ruta es el conducto para obtener las tareas archivadas
router.get('/cheap', travelController.getCheapTravels);   // Esta ruta es el conducto para obtener las tareas archivadas
router.post('/', travelController.addTravel);   // Esta ruta es el conducto para añadir tarea
router.get('/:id', travelController.getTravel); // Esta es el conducto para traer una tarea especifica
router.put('/:id', travelController.putTravel); // Esta es el conducto para actualizar una tarea especifica
router.put('/:id/status', travelController.putStatusTravel); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.put('/:id/softdelete', travelController.softDeleteTravel); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.delete('/:id', travelController.deleteTravel); // Esta es el conducto para eliminar tarea especifica SoftDelete

module.exports = router; // Exportando un objeto con métodos y propiedades que se usan en