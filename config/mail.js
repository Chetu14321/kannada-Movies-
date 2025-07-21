const { json } = require('express');
const { StatusCodes } = require('http-status-codes');
const nodemail=require('nodemailer')

const mailHandler=async(receiver,subj,temp,fileAttach=[])=>{
    try {
        //mail config
        const transporter= await nodemail.createTransport({
            service:process.env.MAIL_SERVICE,
            port:process.env.MAIL_PORT,
            host:process.env.MAIL_HOST,

            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        //handler

        let res=await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:receiver,
            subject:subj,
            html:`<div>${temp}</div>`,
            attachments:fileAttach
        })

        //promise response
        return res
        
    } catch (err) {
        return err.message

}
}

module.exports =mailHandler
