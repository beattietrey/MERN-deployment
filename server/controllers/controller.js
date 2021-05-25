const Pet = require('../models/models');
module.exports = {
    // Create
    createPet: (req, res) => {
        // if(!(Pet.exists({name:req.body.name}))){
        Pet.create(req.body)
        .then (pet => res.json({message: "Success", results: pet}))
        .catch(err => res.json({message: "Error", results: err}))
        // } else {
        //     res.json({message: "Error", error: "Name must be unique"})
        // }
    },
    // Read
    getAllPets: (req,res) => {
        Pet.find().sort({type: 1, _id:1})
            .then(pets => res.json({message: "Success", results: pets}))
            .catch(err => res.json({message: "error", results:err}))
        },
    getOnePet: (req, res) => {
        Pet.findById({_id: req.params.id})
        .then(pets => res.json({message: "Success", results: pets}))
        .catch(err => res.json({message: "error", results:err}))
    },

// Update
    updatePet: (req,res) => {
        Pet.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators:true})
            .then(pet => res.json({message: "Success", results: pet}))
            .catch(err => res.json({message: "Error", results: err}))
    },
    // Delete
    deletePet: (req,res) => {
        Pet.findByIdAndDelete(req.params._id)
        .then(pet => res.json({ message: "Success", result: pet}))
        .catch(err => res.json({ message: "Error", results: err}))
    },
}