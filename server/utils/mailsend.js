const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (email, subject, text) => {
    try {
        // Create a transporter with error handling
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // Verify connection configuration
        await transport.verify();
        
        // Send mail with proper error handling
        const info = await transport.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text
        });

        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error; // Re-throw to handle in calling function
    }
};

module.exports = sendEmail;
