/**
 * Funciones CRUD
 *
 */
const var_dump = require('var_dump')
const Travel = require('../models/travel'); // Requerimos su modelo
const travelCtrl = {}; // controlador de tarea

// Función para obtener todas los viajes activas
travelCtrl.getTravels = async (req, res) => { // Aqui falta filtrar donde el status sea 1
    // const travels = await travel.find(); // Esto trae todas
    const travels = await Travel.find( // Esto trae todas los viajes con estado 1
        { status: 1 }
    );
    res.json(travels);
}

// Función para obtener todas los viajes activas
travelCtrl.getPremiumTravels = async (req, res) => { // Aqui falta filtrar donde el status sea 1
    // const travels = await travel.find(); // Esto trae todas
    const travels = await Travel.find( // Esto trae todas los viajes con estado 1
        { type: 1 }
    );
    res.json(travels);
}

// Función para obtener todas los viajes activas
travelCtrl.getCheapTravels = async (req, res) => { // Aqui falta filtrar donde el status sea 1
    // const travels = await travel.find(); // Esto trae todas
    const travels = await Travel.find( // Esto trae todas los viajes con estado 1
        { type: 2 }
    );
    res.json(travels);
}

// Función para obtener todas los viajes archivadas
travelCtrl.getArchivedTravels = async (req, res) => { // Aqui falta filtrar donde el status sea 2
    // const travels = await travel.find(); // Esto trae todas
    const travels = await Travel.find( // Esto trae todas los viajes con estado 2
        { status: 2 }
    );
    res.json(travels);
}

// Función para obtener todas los viajes eliminadas
travelCtrl.getDeletedTravels = async (req, res) => { // Aqui falta filtrar donde el status sea 3
    // const travels = await travel.find(); // Esto trae todas
    const travels = await Travel.find( // Esto trae todas los viajes con estado 3
        { status: 3 }
    );
    res.json(travels);
}

// Genenrar tarea
travelCtrl.addTravel = async (req, res) => {
    const travel = new Travel(req.body)
    travel.status = 1; // diferente
    await travel.save();
    res.json({
        'status': 'Travel Saved'
    })
}

// Obtener tarea especifica por ID
travelCtrl.getTravel = async (req, res) => { // obtener por status 1
    const travel = await Travel.findById(req.params.id)
    res.json(travel)
}

// Actualizar tarea especifica
travelCtrl.putTravel = async (req, res) => {

    const { id } = req.params;

    const travel = {
        namePlace: req.body.namePlace,
        places: req.body.places,
        toDo: req.body.toDo,
        food: req.body.food,
        hotels: req.body.hotels,
        price: req.body.price,
        type: req.body.type
    };

    // var_dump(req)

    await Travel.findByIdAndUpdate(id, { $set: travel }, { new: true });
    res.json({ "status": "travel Updated" });
}

// Cambiar estado de la tarea -> Archivarla
travelCtrl.putStatusTravel = async (req, res) => {

    const { id } = req.params;

    const travel = {
        status: (req.body.status == 1) ? 2 : 1
    };

    await Travel.findByIdAndUpdate(id, { $set: travel }, { new: true });
    res.json({ "status": "Status Travel Updated" });
}

// Cambiar estado de la tarea (SoftDelete)
travelCtrl.softDeleteTravel = async (req, res) => {

    const { id } = req.params;

    const travel = { status: 3 };

    await Travel.findByIdAndUpdate(id, { $set: travel }, { new: true });
    res.json({ "status": "Status Travel Updated (SoftDelete)" });
}

// Eliminar una tarea
travelCtrl.deleteTravel = async (req, res) => {
    await Travel.findByIdAndDelete(req.params.id)
    res.json({ status: "travel Deleted" })
}

module.exports = travelCtrl;