const nodeemailer = require('nodemailer');
const Mailgen = require('mailgen');
require("dotenv").config({ path: "./email.env" });
const email = process.env.EMAIL;
const pass = process.env.PASS;
const Mail = require('nodemailer/lib/mailer');

// const logo = require('./images/logo.png');

async function emailConfirm(req,res){

    // const {names, date, time, restaurant, userEmail, people}= req.body;
    const {date, time, restaurant, userEmail, people}= req.body;
    console.log("date : " + date);
    console.log("time : " + time);
    console.log("restaurant : " + restaurant);
    console.log("people : " + people);

    let transporter = nodeemailer.createTransport({
        service:'gmail',
        auth:{
        user: email, 
        pass: pass
        }
    });
    
    console.log(transporter)

    let mailGenerator = new Mailgen({
        theme : "default",
        product:{
            name:'ECTable',
            link:"http://localhost:5173"
        }
    });

    let emailContent = {
    
            
            body:{

                // name: names,
                intro: 'Your reservation has been  confirmed!',
                table: {
                    data: [
                        {
                            item: 'Restaurant',
                            description: restaurant
                        },
                        {
                            item: 'Date',
                            description: date
                        },
                        {
                            item: 'Time',
                            description: time
                        },
                        {
                            item: 'People',
                            description: people
                        }
                    ]
                },
                outro:'Thank you for reservation.'  
            }
        }
 
    
    // let emailcontext = emailContent(names,date,time,restaurant);
    // let emailBody = mailGenerator.generate(emailcontext);
    // let emailText = mailGenerator.generatePlaintext(emailcontext);

    // require('fs').writeFileSync('preview.html', emailBody, 'utf8');

    let mail = mailGenerator.generate(emailContent);

    let message = {
        
        from : email,
        to : userEmail,
        subject : 'Booking Confirmation',
        html : mail
        
    }

    // console.log(message)

    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            message: "Confirmation Email sent."
        })
    }).catch(error =>{
        return res.status(500).json({error: error.message})
    })

}

module.exports = emailConfirm;

    