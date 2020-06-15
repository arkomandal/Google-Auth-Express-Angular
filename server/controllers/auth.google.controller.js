const db = require('../models/index');
const auth = require('google-auth-library').auth;
const config = require('../lib/config.json');
const credentials = require('../lib/credentials.json');
const jwt = require('jsonwebtoken');
const jwt_config = require('../middlewares/jwt/jwt-config');

exports.authenticate = (req, res) => {
    const googleClient = auth.fromJSON(credentials);

    return googleClient
        .verifyIdToken({
            idToken: req.body.token,
            audience: config.google.clientID
        })
        .then(login => {
            //if verification is ok, google returns a jwt
            const payload = login.getPayload();

            //check if the jwt is issued for our client
            const audience = payload.aud;
            if (audience !== config.google.clientID) {
                return res.status(422).json({
                    status: 422,
                    message: 'Error while authenticating google user ',
                    data: null,
                    err: 'audience mismatch'
                });
            }

            //promise the creation of a user
            return {
                name: payload['name'], //profile name
                pic: payload['picture'], //profile pic
                googleId: payload['sub'], //google id
                email_verified: payload['email_verified'],
                email: payload['email']
            };
        })
        .then(user => {
            // saving the user in database if not exists
            return db.user.findOne({ email: user['email'] }).then(userExists => {
                if (!userExists) {
                    const data = new db.user(user);
                    data.save();
                    return data;
                } else {
                    return userExists;
                }
            });
        })
        .then(user => {
            //provide a jwt token here for accessing apis
            const token = jwt.sign({ id: user['_doc']._id }, jwt_config.secret, { expiresIn: '1h' });
            return { ...user['_doc'], token }
        })
        .then(user => {
            return res.status(200).json({ status: 200, message: 'SUCCESS', data: user, err: null });
        })
        .catch(err => {
            return res.status(500).json({ status: 500, message: 'Error while authenticating google user', data: null, err: err });
        });
};