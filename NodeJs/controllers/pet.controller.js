/**
 * Funciones CRUD
 *
 */
const var_dump = require('var_dump')
const Pet = require('../models/pet'); // Requerimos su modelo
const petCtrl = {}; // controlador de mascota

// Función para obtener todas las mascotas activas
petCtrl.getPets = async (req, res) => { // Aqui falta filtrar donde el status sea 1
    // const pets = await Pet.find(); // Esto trae todas
    const pets = await Pet.find( // Esto trae todas las mascotas con estado 1
        { status: 1 }
    );
    res.json(pets);
}

// Genenrar mascota
petCtrl.addPet = async (req, res) => {
    const pet = new Pet(req.body)
    pet.status = 1;

    const { type } = req.body;

    // new RegExp(result, 'i')
    const valPet = await Pet.findOne({ type: new RegExp(type, 'i'), status: 1 }) // Buscar por tipo de mascota

    if (!valPet) {
        await pet.save();
        return res.json({'status': 'Pet Saved', valPet})
    }else {
        return res.json({'status': 23000, valPet})
    }
}

// Obtener mascota especifica por ID
petCtrl.getPet = async (req, res) => { // obtener por status 1
    const pet = await Pet.findById(req.params.id)
    res.json(pet)
}

// Actualizar mascota especifica
petCtrl.putPet = async (req, res) => {

    const { id } = req.params;

    const pet = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description
    };

    await Pet.findByIdAndUpdate(id, { $set: pet }, { new: true });
    res.json({ "status": "Pet Updated" });
}

// Cambiar estado de la mascota -> Archivarla
petCtrl.putStatusPet = async (req, res) => {

    const { id } = req.params;

    const pet = {
        status: (req.body.status == 1) ? 2 : 1
    };

    await Pet.findByIdAndUpdate(id, { $set: pet }, { new: true });
    res.json({ "status": "Status Pet Updated" });
}

// Cambiar estado de la mascota (SoftDelete)
petCtrl.softDeletePet = async (req, res) => {

    const { id } = req.params;

    const pet = {
        status: 3
    };

    await Pet.findByIdAndUpdate(id, { $set: pet }, { new: true });
    res.json({ "status": "Status Pet Updated (SoftDelete)" });
}

// Eliminar una mascota
petCtrl.deletePet = async (req, res) => {
    await Pet.findByIdAndDelete(req.params.id)
    res.json({ status: "Pet Deleted" })
}

module.exports = petCtrl;