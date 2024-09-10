const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Package = require('../../model/Package/P_model');

const router = express.Router();

// Validation middleware for package data
const validatePackageData = [
    body('pID').notEmpty().withMessage('pID is required'),
    body('province').notEmpty().withMessage('Province is required'),
    body('packageName').notEmpty().withMessage('Package Name is required'),
    body('places').notEmpty().withMessage('Places is required'),
    body('meals').notEmpty().withMessage('Meals is required'),
    body('activities').notEmpty().withMessage('Activities is required'),
    body('accommodation').notEmpty().withMessage('Accommodation is required'),
    body('price').notEmpty().withMessage('Price is required'),
];

// Validation middleware for ID parameter
const validateIDParam = [
    param('id').notEmpty().withMessage('ID parameter is required')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Save packages
router.post('/package/save', validatePackageData, handleValidationErrors, async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        await newPackage.save();
        return res.status(200).json({
            Success: "Package saved successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// Get packages
router.get('/package', async (req, res) => {
    try {
        const packages = await Package.find().exec();
        return res.status(200).json({
            success: true,
            existingPackage: packages
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// Get specific package
router.get('/package/:id', validateIDParam, handleValidationErrors, async(req, res)=> {
    try {
        const packageID = req.params.id;
        const package = await Package.findById(packageID).exec();
        
        if (!package) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        
        return res.status(200).json({
            success: true,
            package: package
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// Update packages
router.put('/package/update/:id', validateIDParam, validatePackageData, handleValidationErrors, async (req, res) => {
    try {
        await Package.findByIdAndUpdate(req.params.id, { $set: req.body });
        return res.status(200).json({
            success: "Updated Successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// Delete packages
router.delete('/package/delete/:id', validateIDParam, handleValidationErrors, async (req, res) => {
    try {
        const deletePackage = await Package.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Delete Successful",
            deletePackage
        });
    } catch (error) {
        return res.status(400).json({
            message: "Delete Unsuccessful",
            error: error.message
        });
    }
});



module.exports = router;
