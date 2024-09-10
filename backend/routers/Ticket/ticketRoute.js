const express = require('express');
const Ticket = require('../../model/Ticket/ticketModel');

//Create an express router instance
const router = express.Router();

// Route for saving a new Ticket
router.post('/', async (request, response) => {
    try {
        
        //Validate request body for required feilds
        if (!request.body.t_id || !request.body.name || !request.body.email || !request.body.issueType || !request.body.issue) {
            return response.status(400).send({
                message: 'Send all required fields: t_id ,name, email, issueType, issue',
            });
        }

        //Create a new ticket object with data from the request body
        const newTicket = {

            t_id: request.body.t_id,
            name: request.body.name,
            email: request.body.email,
            issueType: request.body.issueType,
            issue: request.body.issue,
            
        };

        

        // Create a new Ticket entry in the database
        const ticket = await Ticket.create(newTicket);

        //send a success response with the created ticket
        return response.status(201).send(ticket);
    } catch (error) {

        //handle errors and send an error response
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});



// Route for Get All Ticket from database
router.get('/', async (request, response) => {
    try {
        //find all tickets in the database and sort them by createAt timestamp in descending order
        const ticket = await Ticket.find({}).sort({ createdAt: -1 });

        //send a success response with the count of tickets and the ticket data
        return response.status(200).json({
            count: ticket.length,
            data: ticket,
        });
    } catch (error) {

        //handle errors and send an error response
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// router for get one ticket
router.get('/:_id', async (request, response) => {
    try {

        //Extract the ticket ID from the request parameters
        const { _id } = request.params;

        //Find the ticket by its ID in the database
        const ticket = await Ticket.findById({ _id });
        return response.status(200).json(t)
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route the update

router.put('/:_id', async (request, response) => {
    try { 
        //Validate request body for required fields
        if (!request.body.name || !request.body.email || !request.body.issueType || !request.body.issue) {
            return response.status(400).send({
                message: 'Send all required fields: name, email, issueType, issue',
            });
        }

        //Extract the ticket id from the request parameters
        const { _id } = request.params;

        //create a new ticket object with updated data from the request body
        const newTicket = {
            name: request.body.name,
            email: request.body.email,
            issueType: request.body.issueType,
            issue: request.body.issue,
           
        };

        
       //find the ticket by its ID and update it with the new data
        const result = await Ticket.findByIdAndUpdate(_id, newTicket, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Ticket not found' });
        }

        return response.status(200).send({ message: 'Ticket updated successfully', result });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route for deleting a ticket by its id
router.delete('/:_id', async (request, response) => {
    try {

        const { _id } = request.params;

        const result = await Ticket.findByIdAndDelete(_id);

        if (!result) {

            return response.status(404).json({ message: 'Ticket record not found' })

        }

        return response.status(200).send({ message: 'Ticket deleted successfully' })


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;