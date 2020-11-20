const express        = require('express');
const router         = express.Router();
const taskController = require('../controllers/task.controller.js');

router.get('/', taskController.getTasks);   // Esta ruta es el conducto para obtener las tareas
router.post('/', taskController.addTask);   // Esta ruta es el conducto para añadir tarea
router.get('/:id', taskController.getTask); // Esta es el conducto para traer una tarea especifica
router.put('/:id', taskController.putTask); // Esta es el conducto para actualizar una tarea especifica
router.put('/:id/status', taskController.putStatusTask); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete
router.delete('/:id', taskController.deleteTask); // Esta es el conducto para eliminar tarea especifica SoftDelete

module.exports = router;