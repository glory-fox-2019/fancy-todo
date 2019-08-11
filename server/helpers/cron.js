module.exports = () => {
    const moment = require('moment')
    const cron = require('node-cron')
    const nodemailer = require('nodemailer')
    const Todo = require('../models/Todo')
    const User = require('../models/User')
    const mongoose = require("mongoose")
    const now = moment()
    let sendEmail = cron.schedule('33 23 * * *', () => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.from_email,
                pass: process.env.from_pass
            }
        });
        
        
        User.find().select('username').select('email')
        .then(users => {
            let arrayOfUser = users
            arrayOfUser.forEach((el,i) => {
                let arrayOfDueTime = [];
                Todo.find({
                    owner: el._id
                })
                .then(results => {
                    results.forEach((el) => {
                        let expired = moment(el.due_date);
                        let diff = expired.diff(now,'days',true)
                        if(diff < 2 && diff >= 0) {
                            arrayOfDueTime.push({
                                name: el.name,
                                desc: el.description,
                                due_time: expired
                            })
                        }
                    })
                    if(arrayOfDueTime.length !== 0) {
                        var activity = ``
                        arrayOfDueTime.forEach((el) => {
                            activity += `name: ${el.name}\ndescription: ${el.desc}\ndue_date: ${el.due_time}\n\n`
                        })
                        let setupEmail = {
                            from: `"Fancy-Todo" ${process.env.from_email}`,
                            to: `${el.email}`,
                            subject: 'YOUR ACTIVITY DEADLINE',
                            text: `${activity}`
                        }
                        transporter.sendMail(setupEmail, (err, info) => {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log('SENT')
                            }
                        })
                    }
                    mongoose.disconnect()
                })
                .catch(err => {
                    console.log(err)
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    
    },{
        scheduled:true,
        timezone: "Asia/Jakarta"
    });
    
    sendEmail.start()
}

