const express = require('express');
const router = express.Router();
const Plans = require('../models/plans'); //This is required for the mongoose database

router.get('/', (req,res) => {
    res.render('index', {title: 'Workout Tracker'});
});

router.get('/lists', async (req,res) => {
    try {
        const plans = await Plans.find(); //Searches in the Surveys mongoose database for the created plans
        res.render('plans/list', {title: 'List of plans', plans}); //view for all the workout plans
    } catch(error){
        res.status(500).send("Error: Couldn't find plan") //Error handler for any errors that occur
    }
});

router.get('/create', (req,res) => { //Route to the create.ejs file
    res.render('plans/create', {title: 'Create a plan'});

});

router.post('/create', async (req, res) => {
    const {title, description} = req.body; //req.body allows website to access data sent by the user (eg. forms)
    try{
        const newPlan = new Plan({workout, duration, date});
        await newWorkout.save();
        res.redirect('/plans')

    } catch (error){
        res.status(500).send("Error: Could not create plan")
    }
});


router.get('/update/:id') //:id targets the specific thing you want to update