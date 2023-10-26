const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app  = express()

const mongoURI = `mongodb+srv://francis:HSVKmzgrkIxiOEMu@cluster0.soln6fi.mongodb.net/myApp?retryWrites=true&w=majority`;
mongoose.connect(mongoURI);


// MIDDLEWARWE
app.use(bodyParser.json());

/// MODELS
const { User } = require('./models/user');


app.post('/api/user',async(req,res)=>{
    try{
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        let doc = await user.save();
        res.status(200).send(doc);
    } catch(err){
        res.status(400).send(err)
    }
});


app.post('/api/user/login',async(req,res)=>{
    try{
        // 1 -find the user,if good, -> move forward
        let user = await User.findOne({'email':req.body.email});
        if(!user) throw 'User not found';

        // 2 - compare the password with the HASHED password on the DB, -> move forward
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err) throw 'Bad password';
                if(!isMatch) return  res.status(400).json({
                    message:'Bad password'
                })


                // 3 - send response
                res.status(200).send(isMatch);
            })
    } catch(error){
        res.json({message:error})
    }
    
  

})



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});