const {User}=require('../Models/index');


exports.is_admin = async (req, res, next) => {

User.findByPk(req.UserId).then((user) => {

    if(user.isAdmin){
        next();
    }
    else{
        const error=new Error('You are not authorized to perform this action');
        error.status=403;
        next(error);
    }

})


}