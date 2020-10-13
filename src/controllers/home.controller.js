/**
 * controller home page
 */
const HomeController = {};


HomeController.homepage = (req, res)=>{
    return res.send("Hello secure Online Auction System");
}

export default HomeController;