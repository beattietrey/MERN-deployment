const PetController = require('../controllers/controller');

module.exports = app => {
    // Create
    app.post('/api/pets', PetController.createPet)
    // Read
    app.get('/api/pets', PetController.getAllPets)
    app.get('/api/pets/:id', PetController.getOnePet)
    // Update
    app.put('/api/pets/:_id', PetController.updatePet)
    // Delete
    app.delete('/api/pet/:_id', PetController.deletePet)
}