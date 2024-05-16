import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dksisodia002@gmail.com',
        pass: 'ibhkokmlhkmkyixc'
    }
});

export const sendMail = async(to: string, subject: string, token: string) => {
    try {
        const mailOptions = {
            to: to,
            subject: `Password Reset: ${subject}`,
            text: `
                Click on the link below to reset your password:
                http://localhost:5173/reset-password/${token}
            `
        }
    
       await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred:', error);
            } else {
                return JSON.parse(JSON.stringify(info));
            }
        });


    } catch (error) {
        throw error;
    }

}


export default transporter;
