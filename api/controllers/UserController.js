/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    login: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        if (req.method == "GET")
            return res.view('user/login',{'username': username});
        else {
            console.log(req.body.username.toString(),req.body.password)
            User.findOne({ username: req.body.username }).exec(function (err, user) {
                // Load the bcrypt module
                var bcrypt = require('bcrypt');
                // Generate a salt
                var salt = bcrypt.genSaltSync(10);

                if (user == null)
                    return res.send("No such user");
                if (!bcrypt.compareSync(req.body.password, user.password))
                    return res.send("Wrong Password");

                console.log("The session id " + req.session.id + " is going to be destroyed.");
                req.session.regenerate(function (err) {

                    console.log("The new session id is " + req.session.id + ".");

                    req.session.username = req.body.username;
                    req.session.userid = user.id;
                    console.log(user.id);
                    req.session.coins = user.coins;
                    console.log("login successfully.");
                    var result = {
                        "username":req.body.username,
                        "userid":user.id,
                        "status":true
                    };
                    return res.send(result);
                });
            });
        }
    },
    logout: function(req, res) {

        console.log("The current session id " + req.session.id + " is going to be destroyed.");

        if (req.method == "GET") {
            console.log("The current session id " + req.session.id + " is going to be destroyed.");

            req.session.destroy(function (err) {
                return res.view('user/logout', {'username': "Visitor"});
            });
        }else{
            req.session.destroy(function (err) {
                return res.send('success');
            });
        }

    },
};

