const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data.json');
const db = low(adapter);

exports.addAnimal = (req, res) => {
    if(req.body) {
        let newAnimal = req.body.name;

        // Type safety??
        if(newAnimal.match("[a-zA-Z]")) {

            const animalsNames = db.get('animals')
                .map('name')
                .value();

            if (!animalsNames.includes(newAnimal)) {
                db.get('animals')
                    .push({id: animalsNames.length + 1, name: newAnimal})
                    .write();

                res.status(200).send({
                    message: newAnimal + " added successfully",
                });
            } else {
                res.status(409).send({
                    message: newAnimal + " already exists!"
                });
            }
        } else {
            res.status(400).send({
                message: "Input must be string"
            });
        }
    }

    res.status(400).send();
};

exports.deleteAnimal = (req, res) => {
    let animalName = req.params.id;

    // Type safety??
    if(animalName.match("[a-zA-Z]")) {
        const animalsNames = db.get('animals')
            .map('name')
            .value();

        if(animalsNames.includes(animalName)) {
            db.get('animals')
                .remove({name: animalName})
                .write();

            res.status(200).send({
                message: animalName + " removed successfully",
            });
        } else {
            res.status(409).send({
                message: animalName + " doesn't exist!"
            });
        }
    } else {
        res.status(400).send({
            message: "Input must be string"
        });
    }

    res.status(400).send();
};

exports.getAll = (req, res) => {
    let animals = db.get('animals')
        .value();

    res.status(200).send({
        animals: animals,
    });
};