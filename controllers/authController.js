const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data.json');
const db = low(adapter);

const authJwt = require("../middleware/authJwt");

exports.signin = (req, res) => {

    // https://stackoverflow.com/questions/23616371/basic-http-authentication-with-node-and-express-4
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    //Only email and password consisting of letters and numbers
    if(username && password) {
        //Get user
        let user = db.get('users')
            .find({username: username})
            .value();

        //Check user password then send token
        if(user) {
            if (user["password"] === password) {
                let token = authJwt.createToken(username);

                res.status(200).send({
                    accessToken: token,
                });
            }
        }
    }

    res.status(401).send();
};