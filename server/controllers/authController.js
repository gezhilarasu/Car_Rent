const model=require('../model/user');
const  sendEmail=require('../utils/mailsend');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const verifiedOtp = new Set();

const PendingUser = require('../model/pendinguser');

const user_initiateRegistration = async (req, res) => {
    const { username, email, password, phone_number, address } = req.body;

    try {
        const existingUser = await model.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const existingPending = await PendingUser.findOne({ email });
        if (existingPending) await PendingUser.deleteOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        const newPendingUser = new PendingUser({
            username,
            email,
            password: hashedPassword,
            phone_number,
            address,
            role_type: 'user',
            otp,
            otp_expiry: expiry
        });

        await newPendingUser.save();

        await sendEmail(email, 'OTP for Registration', `Your OTP is ${otp}. It expires in 5 minutes.`);

        return res.status(200).json({ message: 'OTP sent successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const user_completeRegistration = async (req, res) => {
    const { email, enteredOtp } = req.body;

    try {
        const pendingUser = await PendingUser.findOne({ email });
        if (!pendingUser)
            return res.status(400).json({ message: 'No pending registration found' });

        if (pendingUser.otp !== enteredOtp || pendingUser.otp_expiry < Date.now())
            return res.status(400).json({ message: 'Invalid or expired OTP' });

        const newUser = new model({
            username: pendingUser.username,
            email: pendingUser.email,
            password: pendingUser.password,
            phone_number: pendingUser.phone_number,
            address: pendingUser.address,
            role_type: pendingUser.role_type
        });

        await newUser.save();
        await PendingUser.deleteOne({ email });

        return res.status(200).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const admin_initiateRegistration = async (req, res) => {
    const { username, email, password, phone_number, address } = req.body;

    try {
        const existingUser = await model.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const existingPending = await PendingUser.findOne({ email });
        if (existingPending) await PendingUser.deleteOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        const newPendingUser = new PendingUser({
            username,
            email,
            password: hashedPassword,
            phone_number,
            address,
            role_type: 'user',
            otp,
            otp_expiry: expiry
        });

        await newPendingUser.save();

        await sendEmail(email, 'OTP for Registration', `Your OTP is ${otp}. It expires in 5 minutes.`);

        return res.status(200).json({ message: 'OTP sent successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const admin_completeRegistration = async (req, res) => {
    const { email, enteredOtp } = req.body;

    try {
        const pendingUser = await PendingUser.findOne({ email });
        if (!pendingUser)
            return res.status(400).json({ message: 'No pending registration found' });

        if (pendingUser.otp !== enteredOtp || pendingUser.otp_expiry < Date.now())
            return res.status(400).json({ message: 'Invalid or expired OTP' });

        const newUser = new model({
            username: pendingUser.username,
            email: pendingUser.email,
            password: pendingUser.password,
            phone_number: pendingUser.phone_number,
            address: pendingUser.address,
            role_type: pendingUser.role_type
        });

        await newUser.save();
        await PendingUser.deleteOne({ email });

        return res.status(200).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
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

const sentOtp = async (req, res) => {
    const { email } = req.body;
    console.log('Sending OTP to:', email);
    
    try {
        const existsEmail = await model.findOne({ email });

        if (!existsEmail) {
            return res.status(400).json({ message: 'Email does not exist' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        existsEmail.otp = otp;
        existsEmail.otp_expiry = expiry;
        await existsEmail.save();
        console.log('Generated OTP:', otp);
        
        try {
            await sendEmail(
                email, 
                'OTP verification', 
                `Your OTP is ${otp}. It will expire in 5 minutes.`
            );
            return res.status(200).json({ message: 'OTP sent successfully' });
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Rollback OTP changes if email fails
            existsEmail.otp = undefined;
            existsEmail.otp_expiry = undefined;
            await existsEmail.save();
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const verifyOtp =async(req,res)=>{
    const {email,created_otp}=req.body;

    try{

        const emailexists=await model.findOne({email});

        if(!emailexists || emailexists.otp !== created_otp || emailexists.otp_expiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        verifiedOtp.add(email);
        emailexists.opt=null;
        emailexists.opt_expiry=null;
        await emailexists.save();
        return res.status(200).json({message:'OTP verified successfully'});
    }
    catch(err)
        {
            return res.status(500).json({message:'Internal server error'});
        }
};

const resetpassword =async(req,res)=>{
    const {email,newpassword}=req.body;
    try{
        const emailexists=await verifiedOtp.has(email);
        if(!emailexists){
            return res.status(400).json({message:'Email does not exist'});
        }
        const hashedpassword=await bcrypt.hash(newpassword,10);
        const user=await model.findOne({email});
        user.password=hashedpassword;
        await user.save();
        verifiedOtp.delete(email);
        return res.status(200).json({message:'Password reset successfully'});
    }
    catch(err)
    {
        return res.status(500).json({message:'Internal server error'});
    }
}

module.exports = {
    user_initiateRegistration,
    user_completeRegistration,
    admin_initiateRegistration,
    admin_completeRegistration,
    verifyOtp,
    resetpassword,
    sentOtp,
    loginUser
};