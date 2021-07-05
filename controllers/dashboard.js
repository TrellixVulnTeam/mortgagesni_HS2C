//Import any required schemas 

//example route
exports.dashboard = (req, res, next) => {
    const success = req.flash("success") || [];
    res.render("dashboard/dashboard", {
        message: null,
        success: success
    });
}