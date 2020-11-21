/**
 * Funciones CRUD
 *
 */
const var_dump = require('var_dump')
const Task = require('../models/task'); // Requerimos su modelo
const taskCtrl = {}; // controlador de tarea

// Función para obtener todas las tareas activas
taskCtrl.getTasks = async (req, res) => { // Aqui falta filtrar donde el status sea 1
    // const tasks = await Task.find(); // Esto trae todas
    const tasks = await Task.find( // Esto trae todas las tareas con estado 1
        {status: 1}
    );
    res.json(tasks);
}

// Genenrar tarea
taskCtrl.addTask = async (req, res) => {
    const task = new Task(req.body)
    task.status = 1; // diferente
    await task.save();
    res.json({
        'status': 'Task Saved'
    })
}

// Obtener tarea especifica por ID
taskCtrl.getTask = async (req, res) => { // obtener por status 1
    const task = await Task.findById(req.params.id)
    res.json(task)
}

// Actualizar tarea especifica
taskCtrl.putTask = async (req, res) => {

    const { id } = req.params;

    const task = {
        title: req.body.title,
        byWhen: req.body.byWhen,
        description: req.body.description,
        subject: req.body.subject,
        topic: req.body.topic,
        assignmentDate: req.body.assignmentDate
    };

    // var_dump(req)

    await Task.findByIdAndUpdate(id, { $set: task }, { new: true });
    res.json({ "status": "Task Updated" });
}

// Cambiar estado de la tarea -> Archivarla
taskCtrl.putStatusTask = async (req, res) => {

    const { id } = req.params;

    const task = {
        status: (req.body.status == 1) ? 2 : 1
    };

    await Task.findByIdAndUpdate(id, { $set: task }, { new: true });
    res.json({ "status": "Status Task Updated" });
}

// Cambiar estado de la tarea (SoftDelete)
taskCtrl.softDeleteTask = async (req, res) => {

    const { id } = req.params;

    const task = {
        status: 3
    };

    await Task.findByIdAndUpdate(id, { $set: task }, { new: true });
    res.json({ "status": "Status Task Updated (SoftDelete)" });
}

// Eliminar una tarea
taskCtrl.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({status: "Task Deleted"})
}

module.exports = taskCtrl;