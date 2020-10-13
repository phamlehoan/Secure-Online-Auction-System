/**
 * controller home page
 */
const HomeController = {};

HomeController.getHomepage = (req,res) =>{
    console.log(req.user);
    return res.render("main/home/home")
}

HomeController.getProfile = (req,res)=>{
    return res.render("main/profile/profile")
}
HomeController.data = (req,res,next)=>{
    req.flash("data",req.user);
    next(); 
}


export default HomeController;