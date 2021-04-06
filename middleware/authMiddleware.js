exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect("/login");
    }
}

exports.goHomeIfLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/");
    }else{
        return next();
    }
}

exports.checkPermisions=(req,res,next)=>{
    if(req.user.roles.includes("Editor")){
        return next();
    }else{
        return res.redirect("/news");
    }
}
