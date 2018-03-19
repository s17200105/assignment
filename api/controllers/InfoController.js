/**
 * InfoController
 *
 * @description :: Server-side logic for managing Infoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // index function
    index: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        Info.find().exec(function (err, infos) {
            return res.view('info/index', { 'Infos': infos,'username': username, });
        });
    },

    // create function
    create: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        if (req.method == "POST") {
            Info.create(req.body.Info).exec(function (err, model) {
                return res.view('info/message',
                    { 'state': 'Success',
                        'username': username,
                        'value':'Create',
                        'url':1});
            });
        } else {
            return res.view('info/create',{'username': username});
        }
    },

    // view function
    view: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;

        else
            var username = "Visitor";

        if(req.method == "POST") {
            if(req.session.coins- req.body.Qpon.coin >=0) {
                User.findOne({where:{username:username}
                }).exec(function (err, user) {
                    if (user != null) {
                        user.username = req.session.username
                        user.coins = req.session.coins - req.body.Qpon.coin;
                        user.save();
                        req.session.coins= user.coins;

                        Qpon.create(req.body.Qpon).exec(function (err, model) {
                            model.related.add(model.titleid);
                            model.with.add(model.userid);
                            model.save();
                            Info.findOne(req.body.Qpon.titleid).exec(function (err, info) {
                                info.quota --;
                                info.save();
                                console.log("quota:"+info.quota);
                                Qpon.findOne({
                                    where: {
                                        username: req.session.username,
                                        titleid: req.body.Qpon.titleid
                                    }
                                }).exec(function (err, qpon) {
                                    if (info != null && qpon == null) {
                                        console.log("true");
                                        return res.view('info/view', {'info': info, 'username': username, 'status': true, 'id':req.session.userid});
                                    } else if (info != null && qpon != null) {
                                        console.log("false");
                                        return res.view('info/view', {'info': info, 'username': username, 'status': false,'id':req.session.userid});
                                    } else
                                        return res.send("No such info");
                                });
                            });
                        });
                    }
                });
            }
        }else{
            Info.findOne(req.params.id).exec(function (err, info) {
                Qpon.findOne({where:{username:req.session.username,titleid:info.id}}).exec(function(err,qpon){
                    if (info != null && qpon == null) {
                        console.log("true");
                        return res.view('info/view', {'info': info, 'username': username, 'status': true, 'id':req.session.userid});
                    }else if (info != null && qpon != null) {
                        console.log("false");
                        return res.view('info/view', {'info': info, 'username': username, 'status': false, 'id':req.session.userid});
                    }else
                        return res.send("No such info");
                });
            });
        }
    },

    // delete function
    delete: function(req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        Info.findOne(req.params.id).exec( function(err, model) {
            if (model != null) {
                model.destroy();
                return res.view('info/message',
                    { 'state': 'Success',
                        'username': username,
                        'value':'Delete',
                        'url':2});
            }
        });
    },

    //my_coupons function
    my_coupons: function(req, res){
        var array
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        Qpon.find({where:{username:req.session.username,}}).exec(function (err, qpons) {
            console.log("find");
            return res.view('info/my_coupons', { 'Qpons': qpons,'username': username,'coins':req.session.coins });
        });
    },

    //redirect function
    redirect: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        switch (req.params.id){
            case '1':
                return res.view('info/create',{'username': username});
                break;
            case '2':
                Info.find().exec(function (err, infos) {
                    return res.view('info/admin', { 'Infos': infos,'username': username });
                });
                break;
            case '3':
                Info.find().exec(function (err, infos) {
                    return res.view('info/index', { 'Infos': infos,'username': username });
                });
                break;
        }
    },

    //update function
    update:function (req, res){
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        if(req.method == "GET"){
            Info.findOne(req.params.id).exec(function (err, info) {
                if (info != null) {
                    return res.view('info/update', { 'info': info,'username': username });
                }
            });
        }else{
            Info.findOne(req.params.id).exec(function (err, info) {
                if (info != null) {
                    info.title = req.body.Info.title;
                    info.restaurant = req.body.Info.restaurant;
                    info.district = req.body.Info.district;
                    info.mall = req.body.Info.mall;
                    info.image = req.body.Info.image;
                    info.coin = req.body.Info.coin;
                    info.date = req.body.Info.date;
                    info.quota = req.body.Info.quota;
                    info.detail = req.body.Info.detail;
                    info.save();
                    return res.view('info/message',
                        {'state': 'Success',
                            'value': 'Update',
                            'username': username,
                             'url':2});
                } else {
                    return res.view('info/message',
                        {'state': 'Fail',
                            'value': 'Update',
                            'username': username,
                            'url':2});
                }
            });
        }
    },


    //admin function
    admin: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";
        Info.find().exec(function (err, infos) {
            return res.view('info/admin', { 'Infos': infos,'username': username });
        });
    },

    //member function
    member:  function(req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";
        Qpon.find({
            where:{
                titleid:req.params.id,}
        }).exec(function (err, qpons) {
            return res.view('info/member', { 'Qpons': qpons,'username': username });
        });
    },

    // json function
    json: function (req, res) {
        Info.find().exec(function (err, infos) {
            return res.json(infos);
        });
    },

    // paginate function
    search: function (req, res) {
        if (req.session.username != null)
            var username = req.session.username;
        else
            var username = "Visitor";

        const qPage = req.query.page || 1;
        if (req.method == "GET") {

            Info.find().paginate({page: qPage, limit: 2}).exec(function (err, infos) {
                Info.count().exec(function (err, value) {
                    var pages = Math.ceil(value / 2);
                    return res.view('info/search', {'infos': infos, 'count': pages,'username': username});
                });
            });
        }else if(req.method == "POST") {
            Info.find({
                where:{
                    district:req.body.Info.district,
                    date:req.body.Info.date,
                    coin:{'>':req.body.Info.coin[0],
                            '<':req.body.Info.coin[1]
                    }
                }
            }).paginate({page: qPage, limit: 2}).exec(function (err, infos) {
                if (infos != null) {
                    return res.view('info/search', { 'infos': infos,'username': username});
                }else{
                    return res.view('info/message',
                        {'state': 'Fail',
                            'value': 'Update',
                            'username': username,
                            'url':2});
                }
            });
        }
    }
};

