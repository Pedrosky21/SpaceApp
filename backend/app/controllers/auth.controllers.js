const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async(req, res) => {
    try {
        const { userName, password } = req.body;

        // Verifica si el userName ya es utilizado
        let user = await User.findOne({userName});
        if (user) {
            return res.status(409).json({msg: "El nombre de usuario ya existe"});
        }
        if (!password) {
            return res.status(400).json({ msg: "La contraseña es requerida" });
        }

        // Encripta la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        user = new User({userName, "password": hashedPassword}) // {userName: userName, password: hashedPassword}
        await user.save();

        // Generar el token jwt
        const token = jwt.sign({userName: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        // Guardar el token en una cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 3600000 // 1h
        })

        res.status(201).json({message: "Usuario creado exitosamente",
            user: {
                userName: user.userName
            }
        });

    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error});
    }
};


// Login
exports.login = async(req, res) => {
    try {
        const {userName, password} = req.body;

        // Verifica si el userName esta en uso
        let user = await User.findOne({userName});
        if (!user) {
            return res.status(401).json({msg: "Usuario inexistente"});
        }

        // Verifica contraseña
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(401).json({msg: "Contaseña incorrecta"});
        }

        // Generar JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        // Guardar el token en una cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 3600000 // 1h
        })

        res.status(200).json({message: "Login exitoso",
            user: {
                userName: user.userName
            }
        });
        
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error});
    }
}
