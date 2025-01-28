const express = require('express');
const { addMedicine, getMedicines, updateMedicine, deleteMedicine } = require('../controllers/medicineController');

const router = express.Router();

// Route to add a new medicine
router.post('/add', addMedicine);

// Route to get all medicines for a user
router.get('/:userId', getMedicines);

// Route to update a medicine
router.put('/update/:medicineId', updateMedicine);

// Route to delete a medicine
router.delete('/delete/:medicineId', deleteMedicine);

module.exports = router;
