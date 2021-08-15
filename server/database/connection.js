const mongoose = require('mongoose');
const Customer = require('../model/customer');
const Transaction = require('../model/transaction');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then( () => console.log("Connection Successful"))
.catch((err) => console.log(err));

const allCustomers = [
    {
        name:'Kavita Sharma',
        email:'kavitasharma45@gmail.com',
        balance:40000
    },
    {
        name:'Sahil Jain',
        email:'sahilj@gmail.com',
        balance: 30000
    },
    {
        name:'Garima Rawal',
        email:'garimarawal55@gmail.com',
        balance: 50000
    },
    {
        name:'Shree Sanghvi',
        email:'sanghvishree36@gmail.com',
        balance: 45000
    },
    {
        name:'Fateema Sheikh',
        email:'fatimas@gmail.com',
        balance: 28000
    },
    {
        name:'Yash Agrawal',
        email:'yash_agrawal@gmail.com',
        balance: 36000
    },
    {
        name:'Usha Mahajan',
        email: 'ushamahajan86@gmail.com',
        balance: 35000
    },
    {
        name:'Manvi Kukreja',
        email:'kukrejamanvi678@gmail.com',
        balance: 48000
    },
    {
        name:'Tanya Narayan',
        email:'tanyan@gmail.com',
        balance: 43000
    },
    {
        name:'Tushar Chopra',
        email:'tusharchopra22@gmil.com',
        balance: 44000 
    }
]

// Customer.insertMany(allCustomers)
// .then((res) => console.log(res))
// .catch((err) => console.log(err));