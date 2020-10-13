/**
 * controller home page
 */
const HomeController = {};

HomeController.getHomepage = (req,res) =>{
    return res.render("main/home/home",{
        data: req.flash("data")
    })
}

HomeController.getProfile = (req,res)=>{
    return res.render("main/profile/profile",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success")
    })
}



export default HomeController;