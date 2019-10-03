var Dog = require('../models/dog.js');

/**
 * A list of Dogs
 */
exports.list = (req, h) => {
    return Dog.find({}).exec().then((dog) => {
        return {
            dogs: dog
        };
    }).catch((err) => {
        return { 
            err: err
        };
    });
}


/**
 * To a Dog by ID
 */
exports.get = (req, h) => {
    return Dog.findById(req.params.id).exec().then((dog) => {
        if(!dog) return {
            message: 'Dog not Found'
        };
        return {
            dog: dog
        };
    }).catch((err) => {
        return { 
            err: err 
        }
    });
}


/**
 * POST a Dog
 */
exports.create = (req, h) => {
    const dogCreate = {
        name: req.payload.name,
        breed: req.payload.breed,
        age:  req.payload.age,
        image: req.payload.image
    };

    return Dog.create(dogData).then((dog) => {
        return {
            message: "Dog has been created successfully", dog: dog
        };
    }).catch((err) => {
        return {
            err: err
        };
    });
}


/**
 * Put|Update a Dog by ID
 */
exports.update = (req, h) => {
    return Dog.findById(req.params.id).exec().then((dog) => {
        if (!dog) return {
            err: 'Dog not found'
        };

        dog.name = req.payload.name;
        dog.breed = req.payload.breed;
        dog.age = req.payload.age;
        dog.image = req.payload.image;

        dog.save(dogData);
    }).then((data) => {
        return {
            message: "Dog data has been updated successfully"
        };
    }).catch((err) => {
        return {
            err: err
        };
    });
}

/**
 * Delete Dog by ID
 */
exports.remove = (req, h) => {
    return Dog.findById(req.params.id).exec(function (err, dog) {
        if (err) return {
            dberror: err
        };
        if (!dog) return {
            message: 'Dog not found'
        };

        dog.remove(function (err) {
            if (err) return {
                dberror: err
            };

            return {
                success: true
            };
        });
    });
}