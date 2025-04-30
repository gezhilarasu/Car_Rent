const vehicle = require('../model/vehicle');
const car= require('../model/car');
const bike= require('../model/bike');

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

module.exports={insertVehicle};