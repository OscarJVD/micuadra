/**
 * Funciones CRUD
 *
 */
const Quadrangular = require('../models/quadrangular'); // Requerimos su modelo
const quadrangularCtrl = {}; // controlador de cuadrangular

// Función para obtener todas las cuadrangulars activas
quadrangularCtrl.getQuadrangulars = async (req, res) => { // Aqui falta filtrar donde el status sea 1
    // const quadrangulars = await Quadrangular.find(); // Esto trae todas
    const quadrangulars = await Quadrangular.find( // Esto trae todas las cuadrangulars con estado 1
        { status: 1 }
    );
    res.json(quadrangulars);
}

// Función para obtener todas las cuadrangulars archivadas
quadrangularCtrl.getArchivedQuadrangulars = async (req, res) => { // Aqui falta filtrar donde el status sea 2
    const quadrangulars = await Quadrangular.find( // Esto trae todas las cuadrangulars con estado 2
        { status: 2 }
    );
    res.json(quadrangulars);
}

// Función para obtener todas las cuadrangulars eliminadas
quadrangularCtrl.getDeletedQuadrangulars = async (req, res) => { // Aqui falta filtrar donde el status sea 3
    const quadrangulars = await Quadrangular.find( // Esto trae todas las cuadrangulars con estado 3
        { status: 3 }
    );
    res.json(quadrangulars);
}

// Genenrar cuadrangular
quadrangularCtrl.addQuadrangular = async (req, res) => {
    let firstCoupleScoreArr = req.body.firstCoupleScore.split(" "),
        secondCoupleScoreArr = req.body.secondCoupleScore.split(" ");

    req.body.firstTeamGoals = firstCoupleScoreArr[0]
    req.body.secondTeamGoals = firstCoupleScoreArr[2]
    req.body.thirdTeamGoals = secondCoupleScoreArr[0]
    req.body.fourthTeamGoals = secondCoupleScoreArr[2]

    const quadrangular = new Quadrangular(req.body)

    quadrangular.status = 1; // diferente
    await quadrangular.save();
    res.json({
        'status': 'Quadrangular Saved'
    })
}

// Obtener cuadrangular especifica por ID
quadrangularCtrl.getQuadrangular = async (req, res) => { // obtener por status 1
    const quadrangular = await Quadrangular.findById(req.params.id)
    res.json(quadrangular)
}

// Actualizar cuadrangular especifica
quadrangularCtrl.putQuadrangular = async (req, res) => {

    const { id } = req.params;

    const quadrangular = {
        firstTeam: req.body.firstTeam,
        secondTeam: req.body.secondTeam,
        thirdTeam: req.body.thirdTeam,
        fourthTeam: req.body.fourthTeam,
        firstCoupleScore: req.body.firstCoupleScore,
        secondCoupleScore: req.body.secondCoupleScore,
    };

    await Quadrangular.findByIdAndUpdate(id, { $set: quadrangular }, { new: true });
    res.json({ "status": "Quadrangular Updated" });
}

// Cambiar estado de la cuadrangular -> Archivarla
quadrangularCtrl.putStatusQuadrangular = async (req, res) => {

    const { id } = req.params;

    const quadrangular = {
        status: (req.body.status == 1) ? 2 : 1
    };

    await Quadrangular.findByIdAndUpdate(id, { $set: quadrangular }, { new: true });
    res.json({ "status": "Status Quadrangular Updated" });
}

// Cambiar estado de la cuadrangular (SoftDelete)
quadrangularCtrl.softDeleteQuadrangular = async (req, res) => {

    const { id } = req.params;

    const quadrangular = { status: 3 };

    await Quadrangular.findByIdAndUpdate(id, { $set: quadrangular }, { new: true });
    res.json({ "status": "Status Quadrangular Updated (SoftDelete)" });
}

// Eliminar una cuadrangular
quadrangularCtrl.deleteQuadrangular = async (req, res) => {
    await Quadrangular.findByIdAndDelete(req.params.id)
    res.json({ status: "Quadrangular Deleted" })
}

module.exports = quadrangularCtrl;