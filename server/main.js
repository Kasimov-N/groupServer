const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const cors = require('cors');


mongoose.connect(process.env.DB_global_link)
.then(data=>{
    if(data){
        console.log('Connected to DB')
    }else{
        throw new Error({title: 'Error'});
    }
})
.catch(err => {
    console.log(err)
})

//Configration
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//routes 
app.use('/', require('./routes/index'))
app.use('/teachers', require('./routes/teachers'))
app.use('/students', require('./routes/students'))
app.use('/groups', require('./routes/groups'))


//PORT
const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
