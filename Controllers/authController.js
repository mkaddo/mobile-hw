const Users = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {validationResult}=require("express-validator");
const { Tourist } = require("../Models");
exports.signUp = (req, res, next) => {
const errors=validationResult(req)
if(!errors.isEmpty())
{
  const error=new Error()
  error.status=400
  error.data=errors.array()
  throw error

}
    const userName=req.body.userName;
  const password = req.body.password;
  const fName=req.body.fName;
  const lName=req.body.lName;
  const description=req.body.description;
 
 

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
     
      Users.create({
        userName:userName,
        password: hashedPassword,
        
        
      })
        .then(async(user) => {
          console.log(user)
       
          await  Tourist.create({userId:user.id, fName:fName,lName:lName, description:description})
          const token = jwt.sign(
            {
              userName: user.userName,
              UserId: user.id,
           
            },
            process.env.SECRET,
            { expiresIn: "1d" }
          );
         
          res.json({  token: token, UserId: user.id });
        })
        .catch((error) => {
          console.log(error + "/n ######");
          next(error);
        });
    })
    .catch((error) => {
      console.log(error);
 
      next(error);
    });
};

exports.logIn = (req, res, next) => {
  const errors=validationResult(req)
if(!errors.isEmpty())
{
  const error=new Error()
  error.status=400
  error.data=errors.array()
  throw error

}
  const userName = req.body.userName;
  const password = req.body.password;

  Users.findOne({ where: { userName: userName } })
    .then((userInfo) => {
      if(!userInfo){
        const error = new Error();
        error.status = 404;
        throw error;
      }
      bcrypt.compare(password, userInfo.password).then((value) => {
        if (!value) {
          const error = new Error("password not match");
          error.status = 401;
          throw error;
        }

        const token = jwt.sign(
          {
            userName: userInfo.userName,
            UserId: userInfo.id
            
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
       
        res.json({  token: token, UserId: userInfo.id });
      }).catch(error=>{
        next(error)
      });
    })
    .catch((error) => {
      next(error);
    });
};
