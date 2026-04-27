const express = require("express");
const router = express.Router();

const {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea
} = require("../controllers/tarea.controller");

router.get('/tareas', getTareas)
router.post('/tareas', createTarea)
router.patch('/tareas/:id', updateTarea)
router.delete('/tareas/:id', deleteTarea)

module.exports = router;