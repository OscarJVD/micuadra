const Login = require('../models/login') // Modelo Login
const loginCtrl = {}
const jwt = require('jsonwebtoken');

loginCtrl.signin = async (req, res) => {

    const { email, password } = req.body;
    const user = await Login.findOne({ email }) // Buscar por email

    if (!user) return res.status(404).send("El correo no existe")
    if (user.password !== password) return res.status(401).send("Contraseña Incorrecta")

    const token = jwt.sign({ _id: user._id }, 'secret')
    return res.status(200).send({ token })
}

loginCtrl.signup = (req, res) => {
    const params = req.body;
    const newUser = new Login({
        email: params.email,
        name: params.name,
        password: params.password,
        authMethod: params.authMethod,
        idAuth: params.idAuth
    });

    newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'secret');
    res.json({ token });
}

loginCtrl.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return 0;
    } else {
        const token = req.headers.authorization.split(' ')[1]; // Accedemos al token

        if (token === 'null') return 0
        else {
            const payload = jwt.verify(token, 'secret');
            req.userID = payload._id;
            return 1;
        }
    }
}

module.exports = loginCtrl;