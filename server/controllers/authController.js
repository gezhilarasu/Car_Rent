const model=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registerUser= async (req,res)=>{
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

};

const registerAdmin = async (req,res)=>{
    const {username,email,password,phone_number,address}=req.body;
    const role_type='admin';
    try{
        const existingAdmin=await model.findOne({email});
        if(existingAdmin)
        {
            return res.status(400).json({message:'Admin already exists'});
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newAdmin=new model({
            username,
            email,
            password:hashedpassword,
            phone_number,
            address,
            role_type
        });
        await newAdmin.save();
        return res.status(200).json({message:'Admin registered successfully'});
    }
    catch(err)
    {
        return res.status(500).json({message:'Internal server error'});
    }

}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await model.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'The user does not exist'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'The password is incorrect'});
        }
        
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    registerUser,
    registerAdmin,
    loginUser
};