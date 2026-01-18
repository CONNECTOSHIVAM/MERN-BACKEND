import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async(options) => {
    const mailGenetator = new Mailgen({
        theme: "Default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenetator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenetator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
           user: process.env.MAILTRAP_SMTP_USER,
           pass: process.env.MAILTRAP_SMTP_PASS
        }
    });


    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }



    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed ||",error)
    }

}

const emailVerificationMailgenContent = (username,verificationUrl) => {

    return {
        body: {
            name: username,
            intro: "Welcome to Momsnanhi! \n Glad to have you , we are always with you.",
            action:{
                instructions: "To verify email , please click on the button.",
                button: {
                    color: "#d94174",
                    text: "momsnanhi verify",
                    link: verificationUrl
                }
            },
            outro: "We are always here , whenever you feel need to meet and assist definetly reach out me.I really feel blessed on assit you."
        }
    }
}

const forgetPasswordMaingenContent = (username,passwordResetUrl) => {

    return{
        body:{
            name: username,
            intro: "Welcome to Momsnanhi! \n Glad to have you , we are always with you.",
            action: {
                instructions: "we got a request to the reset the password of your account",
                button: {
                    color: '#d94174',
                    text: "reset password",
                    link: passwordResetUrl,
                }
            },
            outro: "We are always here , whenever you feel need to meet and assist definetly reach out me.I really feel blessed on assit you."

        }

    }
}

export {emailVerificationMailgenContent, forgetPasswordMaingenContent, sendEmail}