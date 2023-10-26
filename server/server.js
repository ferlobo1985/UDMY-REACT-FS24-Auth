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
})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});