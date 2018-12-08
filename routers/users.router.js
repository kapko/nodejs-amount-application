// const express = require('express');
// const router = express.Router();
// const Users = require('../models/users');
// const { check, body, validationResult } = require('express-validator/check');
// // const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const jwt = require('jsonwebtoken');

// router.get('/', (req, res) => {
//     Users.find({}, (err, users) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(users);
//         }
//     });
// });

// router.post('/add', [
        // check('name').not().isEmpty(),
        // check('role').not().isEmpty(),
        // check('phone').not().isEmpty(),
        // check('password').not().isEmpty(),
//     ], (req, res) => {

        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.send({error: errors.array()});
        // }

//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(req.body.passwort, salt, (err, hash) => {
//                 req.body.passwort = hash;

//                 const newUser = new Users(req.body);

//                 newUser.save((err, user) => {
//                     if (err) {
//                         res.send(err);
//                     } else {
//                         res.send(user._id);
//                     }
//                 });
//         });

//     });

// });

// passport.use(new LocalStrategy(
//         function(name, password, done) {
//         Users.findOne({ name }, function(err, user) {
    
//             if (err) { return done(err); }

//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }

//             if (!user.validPassword(password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }

//             return done(null, user);
//         });
//     }
// ));

// router.post('/login', (req, res, next) => {
//     console.log(req.body);
//     return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//         if(err) {
//           return next(err);
//         }
    
//         // if(passportUser) {
//         //   const user = passportUser;
//         //   user.token = passportUser.generateJWT();
    
//         //   return res.json({ user: user.toAuthJSON() });
//         // }
    
//         // return status(400).info;
//       })(req, res, next);;
// });

// router.delete('/delete/:id', (req, res) => {
//     Users.findOneAndRemove({_id: req.params.id}, (err, user) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(user)
//         }
//     });
// });

// router.patch('/update/:id', (req, res) => {
//     Users.updateOne({_id: req.params.id}, req.body, (err, user) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(user);
//         }
//     });
// });

// module.exports = router;
