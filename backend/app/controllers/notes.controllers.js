const Note = require('../models/note.models');

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Obtener el id del usuario autenticado desde el token
        const userId = req.userId;

        const newNote = new Note({
            title,
            content,
            user: userId
        })
        await newNote.save();

        res.status(200).json({msg: "Nota creada exitosamente", newNote});
        
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error});
    }
}

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({user: req.userId});
        if (!notes) {
            return res.status(200).json({msg: "No hay notas disponibles"});
        }
        res.status(200).json({notes});
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error});
    }
}

exports.deleteNote = async (req, res) => {
    const { noteId } = req.params;

    try {
        const deletedNote = await Note.findOneAndDelete({_id: noteId, user: req.userId});
        if (!deletedNote) {
            return res.status(400).json({msg: "Nota inexistente"});
        }

        res.status(200).json({msg: "Nota eliminada"});
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error});
    }
}
