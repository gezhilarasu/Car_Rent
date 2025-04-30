const express=require('express');
const router=express.Router();
const {insertVehicle}=require('../controllers/insertvehicleController');

router.post('/insertvehicle',insertVehicle);

module.exports=router;
