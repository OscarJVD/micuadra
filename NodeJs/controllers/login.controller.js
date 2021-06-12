const Login = require('../models/login') // Modelo Login
const loginCtrl = {}
const jwt = require('jsonwebtoken');

loginCtrl.signin = async (req, res) => {

    const { email, password } = req.body;
    const user = await Login.findOne({ email }) // Buscar por email

    if (!user) return res.status(404).send("El correo no existe")
    if (user.password !== password) return res.status(401).send("Contraseña Incorrecta")

    const sessionUserId = user._id;
        // msg = "Logueado correctamente";
    // localStorage.setItem('sessionUserId', user._id)
    const token = jwt.sign({ _id: user._id }, 'secret')
    return res.status(200).send({ token, sessionUserId })
    // return res.status(200).send({ token })
}

loginCtrl.signup = async (req, res) => {
    const {
        email,
        password,
        name,
        authMethod,
        idAuth
    } = req.body;

    const valUser = await Login.findOne({ email }) // Buscar por email

    if (!valUser) {
        const newUser = new Login({
            email: email,
            name: name,
            password: password,
            authMethod: authMethod,
            idAuth: idAuth
        });

        newUser.save();
        // localStorage.setItem('sessionUserId', newUser._id)
        const sessionUserId = newUser._id;
        const token = jwt.sign({ _id: newUser._id }, 'secret');
        return res.json({ token, sessionUserId });
        // return res.json({ token });
    }
}

loginCtrl.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return 0;

    else {
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