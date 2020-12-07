const Authorization = {};

Authorization.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin')
        return res.render('main/errors/forbiden');
    
    next();
}

Authorization.isSeller = (req, res, next) => {
    if (req.user.role !== 'seller')
        return res.render('main/errors/forbiden');
    
    next();
}

Authorization.hasAddPermission = (req, res, next) => {
    if (req.user.role === 'seller' || req.user.role === 'admin')
        next();
    else
        return res.render('main/errors/forbiden');
}


export default Authorization;