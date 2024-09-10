const express = require('express');
const EmployeeLeave = require ('../../model/Employee/Leavemodel');

const router = express.Router();


// Create a new employee leave record
router.post('/', async (req, res) => {
     try {
          const employeeLeave = new EmployeeLeave(req.body);
          await employeeLeave.save();
          res.status(201).json(employeeLeave);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
});

// Get all employee leave records
router.get('/', async (req, res) => {
     try {
          const employeeLeaves = await EmployeeLeave.find();
          res.json(employeeLeaves);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
});

// Get a specific employee leave record by ID
router.get('/:id', async (req, res) => {
     try {
          const employeeLeave = await EmployeeLeave.findById(req.params.id);
          if (!employeeLeave) {
               return res.status(404).json({ error: 'Employee leave record not found' });
          }
          res.json(employeeLeave);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
});

// Update a specific employee leave record by ID
router.put('/:id', async (req, res) => {
     try {
          const employeeLeave = await EmployeeLeave.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!employeeLeave) {
               return res.status(404).json({ error: 'Employee leave record not found' });
          }
          res.json(employeeLeave);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
});

// Delete a specific employee leave record by ID
router.delete('/:id', async (req, res) => {
     try {
          const employeeLeave = await EmployeeLeave.findByIdAndDelete(req.params.id);
          if (!employeeLeave) {
               return res.status(404).json({ error: 'Employee leave record not found' });
          }
          res.sendStatus(204);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
});

module.exports = router;