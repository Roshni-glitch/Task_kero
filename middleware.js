module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/'); // Redirect to login if not authenticated
    }
    next();
};
