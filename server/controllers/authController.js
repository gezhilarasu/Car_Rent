const model=require('../model/user');
const bcrypt=require('bcrypt');

async function registerUser(req,res){
    const {username,email,password,phone_number,address}=req.body;
    const role_type='user';
    try{
        const existingUser=await model.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({message:'User already exists'});
        }
        const hashedpassword=await bcrypt.hash(password,10);

        const newUser=new model({
            username,
            email,
            password:hashedpassword,
            phone_number,
            address,
            role_type
        });
        await newUser.save();
        return res.status(200).json({message:'User registered successfully'});
    }
    catch(err)
    {
        return res.status(500).json({message:'Internal server error'});
    }

}

module.exports={
    registerUser
}