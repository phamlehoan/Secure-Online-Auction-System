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
    return res.render("main/profile/profile")
}



export default HomeController;