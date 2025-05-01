const express=require('express');
const router=express.Router();
const verifyToken = require('../middleware/authmiddleware');
const {insertVehicle,deleteVehicle,updateVehicle}=require('../controllers/vehicleController');

router.post('/insertvehicle',verifyToken,insertVehicle);
router.delete('/deletevehicle/:registration_number',verifyToken,deleteVehicle);
router.put('/updatevehicle/:registration_number',verifyToken,updateVehicle);

module.exports=router;
