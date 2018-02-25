/**
 * InfoController
 *
 * @description :: Server-side logic for managing Infoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // index function
    index: function (req, res) {
        Info.find().exec(function (err, infos) {
            return res.view('info/index', { 'Infos': infos });
        });
    },

    // create function
    create: function (req, res) {
        if (req.method == "POST") {
            Info.create(req.body.Info).exec(function (err, model) {
                return res.view('info/message',
                    { 'state': 'Success',
                     'value':'Create',
                     'url':1});
            });
        } else {
            return res.view('info/create');
        }
    },

    // view function
    view: function (req, res) {
        Info.findOne(req.params.id).exec(function (err, info) {
            if (info != null)
                return res.view('info/view', { 'info': info });
            else
                return res.send("No such info");
        });
    },

    // delete function
    delete: function(req, res) {
        Info.findOne(req.params.id).exec( function(err, model) {
            if (model != null) {
                model.destroy();
                return res.view('info/message',
                    { 'state': 'Success',
                        'value':'Delete',
                        'url':2});
            }
        });
    },

    //redirect function
    redirect: function (req, res) {
        switch (req.params.id){
            case '1':
                return res.view('info/create');
            case '2':
                Info.find().exec(function (err, infos) {
                    return res.view('info/admin', { 'Infos': infos });
                });
        }
    },

    //update function
    update:function (req, res){
        if(req.method == "GET"){
            Info.findOne(req.params.id).exec(function (err, info) {
                if (info != null) {
                    return res.view('info/update', { 'info': info });
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
                         'url':2});
                } else {
                    return res.view('info/message',
                        {'state': 'Fail',
                        'value': 'Update',
                         'url':2});
                }
            });
        }
    },


    //admin function
    admin: function (req, res) {
        Info.find().exec(function (err, infos) {
            return res.view('info/admin', { 'Infos': infos });
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
        const qPage = req.query.page || 1;
        if (req.method == "GET") {

            Info.find().paginate({page: qPage, limit: 2}).exec(function (err, infos) {
                Info.count().exec(function (err, value) {
                    var pages = Math.ceil(value / 2);
                    return res.view('info/search', {'infos': infos, 'count': pages});
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
                    return res.view('info/search', { 'infos': infos});
                }else{
                    return res.view('info/message',
                        {'state': 'Fail',
                            'value': 'Update',
                            'url':2});
                }
            });
        }
    }
};

