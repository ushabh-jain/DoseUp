const Medicine = require('../models/medicineModel');

// Add a new medicine schedule
const addMedicine = async (req, res) => {
  try {
    const { userId, medicines } = req.body;

    const newSchedule = new Medicine({
      userId,
      medicines,
    });

    await newSchedule.save();
    res.status(201).json({ message: 'Medicine schedule added successfully!', data: newSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add medicine schedule.', error: error.message });
  }
};

// Get all medicines for a specific user
const getMedicines = async (req, res) => {
  try {
    const { userId } = req.params;
    const userMedicines = await Medicine.findOne({ userId });

    if (!userMedicines) {
      return res.status(404).json({ message: 'No medicines found for this user.' });
    }

    res.status(200).json({ message: 'Medicines retrieved successfully.', data: userMedicines });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medicines.', error: error.message });
  }
};

// Update a specific medicine
const updateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const updatedData = req.body;

    const updatedMedicine = await Medicine.findOneAndUpdate(
      { 'medicines._id': medicineId },
      { $set: { 'medicines.$': updatedData } }, // Update the specific medicine
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found.' });
    }

    res.status(200).json({ message: 'Medicine updated successfully.', data: updatedMedicine });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update medicine.', error: error.message });
  }
};

// Delete a specific medicine
const deleteMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const updatedSchedule = await Medicine.findOneAndUpdate(
      { 'medicines._id': medicineId },
      { $pull: { medicines: { _id: medicineId } } }, // Remove the specific medicine
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Medicine not found.' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully.', data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete medicine.', error: error.message });
  }
};

module.exports = {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
};
