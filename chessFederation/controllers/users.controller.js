/**
 * Created by sobolrr on 05.06.16.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

module.exports = {
    
    //getUsers users/userlist/
    getUsers: function (req, res, next) {
        User.find({role: {$ne: 'moderator'} }, function (err, users) {
            if (err) {
                return next(err);
            }
            res.json(users);
        });
    },

    getUser: function (req, res, next) {
        User.findById(req.params.user, function (err, user) {
            if (err) {
                return next(err);
            }
            res.json(user);
        });

    },

    // delete /users/userlist/:user
    removeUser: function (req, res, next) {
        User.findByIdAndRemove(req.params.user, function (err) {
            if (err) {
                next(err);
            }
            console.log('User deleted!');
            res.send(200);
        });
    },

    changeRole: function (req, res, next) {
        User.findById(req.params.user, function (err, user) {
            if (err) {
                res.send(err);
            }
            if(user.role == 'publisher'){
                user.role = 'user';
            }
            else if(user.role == 'user'){
                user.role = 'publisher';
            }
            user.save(function(err) {
                if (err) {
                    next(err);
                }
                console.log('status changed');
                res.send(200);

            });

        });
    },

    saveChange: function (req, res, next) {

        var user = new User(req.body);

        User.findByIdAndUpdate(req.params.user,
            { username: user.username, 
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              email: user.email,
              sex: user.sex,
              country: user.country,
              city: user.city,
              rank: user.rank }, function (err) {
            if (err) {
                next(err);
                res.send(err);
            }
            console.log('Post Update!');
            res.send(200);
        });
    }
    
}