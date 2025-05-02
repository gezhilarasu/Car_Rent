const vehicle = require('../model/vehicle');
const car= require('../model/car');
const bike= require('../model/bike');
const { model } = require('mongoose');

const insertVehicle = async (req, res) => {

    const { vehicle_type, 
        registration_number,
        brand, 
        model, 
        full_day_rent_price, 
        city, 
        state, 
        postal_code, 
        contact_number, 
        image_url } = req.body;
    const status='available';

    try{
        const existingvehicle=await vehicle.findOne({registration_number});
        if(existingvehicle)
        {
            res.status(400).json({message:'vehicle already exists'});
        }
        const newvehicle=new vehicle({
            vehicle_type,
            status,
            registration_number,
            brand,
            model,
            full_day_rent_price,
            city,
            state,
            postal_code,
            contact_number,
            image_url,
        });
        
    const savedvehicle=await newvehicle.save();

    if(vehicle_type==='car')
    {
        const { seating_capacity, fuel_type } = req.body;
        const newCar = new car({
            vehicle_id: savedvehicle._id,
            seating_capacity,
            fuel_type
        });
        await newCar.save();
    }
    else if(vehicle_type==='bike')
    {
        const {bike_type} = req.body;
        const newBike = new bike({
            vehicle_id: savedvehicle._id,
            bike_type,
        });
        await newBike.save();
    }

    return res.status(201).json({ 
        message: 'Vehicle added successfully',
        vehicle: savedvehicle
    });
        
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:'Internal server error'});
    }
}


const deleteVehicle =async(req,res)=>{
    const {registration_number}=req.params;
    console.log(registration_number);
    try{
        const existvehicle=await vehicle.findOne({registration_number});
        if(!existvehicle)
        {
            return res.status(404).json({message:'vehicle not found'});
        }
        if(existvehicle.vehicle_type==='car')
        {
            await car.deleteOne({vehicle_id:existvehicle._id}); 
        }
        else if(existvehicle.vehicle_type==='bike')
        {
            await bike.deleteOne({vehicle_id:existvehicle._id});
        }
        await vehicle.deleteOne({_id:existvehicle._id});
        return res.status(200).json({message:'vehicle deleted successfully'});
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({message:'Internal server error'});
    }
}

const updateVehicle =async (req,res)=>{
    const {registration_number}=req.params;
    const updatefield=req.body;
    try{
        const existvehicle= await vehicle.findOne({registration_number});

        if(!existvehicle)
        {
            return res.status(404).json({message:'vehicle not found'});
        }

        const updatevehicle=await vehicle.findOneAndUpdate(
            {registration_number},
            {$set:updatefield},
            {new:true}
        )
        if(updatevehicle.vehicle_type==='car')
        {
            carupdate={};

            if(updatefield.seat_capacity) carupdate.seat_capacity=updatefield.seat_capacity;
            if(updatefield.fuel_type) carupdate.fuel_type=updatefield.fuel_type;

            await car.findOneAnsUpdate(
                {vehicle_id:updatevehicle._id},
                {$set:carupdate},
                {new:true}
            )
        }
        if(updatevehicle.vehicle_type==='bike')
        {
            bikeupdate={};
            if(updatefield.bike_type) bikeupdate.bike_type=updatefield.bike_type;

            await bike.findOneAndUpdate(
                {vehicle_id:updatevehicle._id},
                {$set:bikeupdate},
                {new:true}
            )
        }
        return res.status(200).json({message:'vehicle updated successfully'});
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({message:'Internal server error'});
    }
}

module.exports={insertVehicle,deleteVehicle,updateVehicle};