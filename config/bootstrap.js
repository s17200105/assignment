/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    // Load the bcrypt module
    var bcrypt = require('bcrypt');

    // Generate a salt
    var salt = bcrypt.genSaltSync(10);

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    var users = [
        { "username": "admin", "password": "123456","coins":1000000 , "id": 101 },
        { "username": "boss", "password": "123456", "coins":1000000 ,"id": 102 },
        { "username": "user1", "password": "123456", "coins":1000, "id": 103 },
        { "username": "user2", "password": "123456", "coins":1000, "id": 104 },
        { "username": "user3", "password": "123456", "coins":1000, "id": 105 },
        { "username": "user4", "password": "123456", "coins":1000, "id": 106 },
        { "username": "user5", "password": "123456", "coins":1000, "id": 107 },
        { "username": "user6", "password": "123456", "coins":1000, "id": 108 }
    ];

    var infos = [
        {"id":1,"title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"quota":"100","coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
        {"id":2,"title":"test2", "restaurant":"test2", "district":"HK Island", "mall":"IFC", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"quota":"100","coin":"100", "date":"03/27/2018", "detail":"test2 detail"},
        {"id":3,"title":"test3", "restaurant":"test3", "district":"Kowloon", "mall":"又一城", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"quota":"100","coin":"100", "date":"03/27/2018", "detail":"test3 detail"},
        {"id":4,"title":"test4", "restaurant":"test4", "district":"Kowloon", "mall":"美麗華商場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"quota":"100","coin":"100", "date":"03/27/2018", "detail":"test4 detail"},
        {"id":5,"title":"test5", "restaurant":"test5", "district":"New Territories", "mall":"荃灣廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"quota":"100","coin":"100", "date":"03/27/2018", "detail":"test5 detail"},
        {"id":6,"title":"test6", "restaurant":"test6", "district":"New Territories", "mall":"屯門市廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"quota":"100","coin":"100", "date":"03/27/2018", "detail":"test6 detail"}
    ];

    var qpons = [
        {"id":0,"userid":"103","username":"user1","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
        {"id":1,"userid":"104","username":"user2","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
        {"id":2,"userid":"105","username":"user3","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
        {"id":3,"userid":"106","username":"user4","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
        {"id":4,"userid":"107","username":"user5","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
        {"id":5,"userid":"108","username":"user6","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":6,"userid":7,"username":"user7","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":7,"userid":8,"username":"user8","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":8,"userid":9,"username":"user9","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":9,"userid":10,"username":"user10","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":10,"userid":11,"username":"user11","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":11,"userid":12,"username":"user12","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"},
    //     {"id":12,"userid":13,"username":"user13","titleid":"1","title":"test1", "restaurant":"test1", "district":"HK Island", "mall":"金鐘太古廣場", "image":"https://www.w3schools.com/howto/img_fjords.jpg" ,"coin":"100", "date":"03/27/2018", "detail":"test1 detail"}
    ];




     users.forEach(function (user) {
         user.password = bcrypt.hashSync(user.password, salt);

         User.create(user).exec(function (err, model) {});
     });
    infos.forEach(function (info) {
        Info.create(info).exec(function (err, model) {});
    });
    qpons.forEach(function (qpon) {
        // Qpon.find().exec( function(err, model) {
        //     model.forEach(function (m){
        //         if (m != null) {
        //             m.destroy();
        //         }
        //     });
        // });
        Qpon.create(qpon).exec(function (err, model) {
            model.related.add(model.titleid);
            model.with.add(model.userid);
            model.save();
        });
    });
    cb();
};
