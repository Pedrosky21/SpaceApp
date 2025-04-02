const express = require('express');

const {createNote, getNotes, deleteNote} = require('../controllers/notes.controllers');
const authMiddleware = require('../middlewares/auth.middlewares');

const router = express.Router();

router.post('/create', authMiddleware, createNote);
router.get('/get', authMiddleware, getNotes);
router.delete('/delete/:noteId', authMiddleware, deleteNote);

module.exports = router;