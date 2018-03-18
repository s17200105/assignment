// isAdmin.js
module.exports = function(req, res, next) {

    if (req.session.username == 'admin') {
        return next(); //proceed to the next policy,
    }

    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action.');
};