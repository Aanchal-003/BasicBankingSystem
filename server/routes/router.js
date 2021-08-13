const express = require('express');
const { findByIdAndUpdate } = require('../model/customer');
const route = express.Router();
const Customer = require('../model/customer');
const Transaction = require('../model/transaction');

route.get('/',async (req,res) => {
    res.render('index')
});

route.get('/customer',async (req,res) => {
//     Customer.find((err,docs) => {
//     res.render("customer", {
//         list: docs
//     });
// })
const cus = await Customer.find({});
    res.render('customer',{
        list : cus,
    });
});

route.get('/customer/:id', async(req,res) => {
    const cus = await Customer.find({});
    const _id = req.params.id;
    const c = await Customer.findById(_id);
    res.render('transfer', {
        deet: c,
        list: cus,
        message: req.flash('message')
    });
});

route.post('/customer/:id', async(req,res) => {
    try {
        const _id = req.params.id;
        const c = await Customer.findById(_id);
        const r = await Customer.findOne({name: req.body.receiver});
        const balance = c.balance;

        if(balance>0 && balance>req.body.amount && req.body.amount>0){

        await Customer.findOneAndUpdate({name: c.name}, {balance: parseInt(balance) - parseInt(req.body.amount)});
        await Customer.findOneAndUpdate({name: req.body.receiver}, {balance: parseInt(r.balance) + parseInt(req.body.amount)});


        const tran = new Transaction({
            receiver: req.body.receiver,
            amount: req.body.amount,
            sender: c.name,
        }) 
        const transfer = await tran.save();
        req.flash('success','Transaction Successful');
        res.status(201).redirect("/transaction");

    }else if(balance<req.body.amount){
        req.flash('message','Not Enough Balance!');
        return res.redirect(`/customer/${_id}`)
    }
    else {
        req.flash('message','Amount Should Be More Than Zero');
        return res.redirect(`/customer/${_id}`)
    }

    } catch (err) {
        res.status(400).send(err);
    }
})

route.get('/transaction', async(req,res) => {
    const tran = await Transaction.find({});
    res.render('transaction', {
        history: tran,
        message: req.flash('success')
    });
})

module.exports = route;