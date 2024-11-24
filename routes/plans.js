const express = require('express');
const router = express.Router();
const Plans = require('../models/plans'); //This is required for the mongoose database


router.get('/', (req,res) => {
    res.render('index', {title: 'Workout Tracker'});
});

router.get('/logs', async (req,res) => {
    try {
        const plans = await Plans.find(); //Searches in the Surveys mongoose database for the created plans
        res.render('plans/logs', {title: 'List of plans', plans}); //view for all the workout plans
    } catch(error){
        res.status(500).send("Error: Couldn't find plan") //Error handler for any errors that occur
    }
});

router.get('/create', (req,res) => { //Route to the create.ejs file
    res.render('plans/create', {title: 'Create a plan'});

});

router.post('/create', async (req, res) => { //.post is used to send updates while .get retrieves data for viewing
    const {workout, duration, date} = req.body; //req.body allows website to access data sent by the user (eg. forms being created)
    try{
        const newPlan = new Plans({workout, duration, date});
        await newPlan.save();
        res.redirect('/plans/logs');

    } catch (error){
        res.status(500).send("Error: Could not create plan");
    }
});



router.get('/update/:id', async (req, res) =>{ //Retrieves the survey first
    try{
        const plans = await Plans.findById(req.params.id);
        res.render('plans/update', {title: 'Edit Plan', plans});
    }catch (error){
        res.status(500).send("Error: Plan was not retrieved");
    }
});

router.post('/update/:id', async (req, res) => { //:id targets the specific thing you want to update
    const {workout, duration, date} = req.body;
    try{
        await Plans.findByIdAndUpdate(req.params.id, {workout, duration, date});
        res.redirect('/plans/logs');
    } catch (error){
        res.status(500).send("Error: Could not edit plan");
    }
}); 

router.post('/delete/:id', async (req, res) =>{ //Doesn't need a ejs file since it is handled by a button in an already existing view (logs)
    try {
        await Plans.findByIdAndDelete(req.params.id);
        res.redirect('/plans');
    } catch (error){
        res.status(500).send('Error: Could not delete plan');
    }
})

module.exports = router;

