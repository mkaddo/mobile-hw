const express=require('express')
const app=express()
const sequelize=require("./Utils/DB")
const authRouter=require("./Route/authRoute")
const adminRoute=require("./Route/adminRoute")
const touristRoute=require("./Route/touristRoute")
const is_admin=require("./Middleware/isAdmin")
const is_auth=require("./Middleware/is_auth")
require("./Models/index")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/',(req, res, next) =>{
  res.json({message: 'hello>>> this is main route for mobile flutter home work'})
})
app.use('/hello',(req, res, next) =>{
  res.json({message: 'hello>>> this is main route for mobile flutter home work'})
})
app.use('/auth',authRouter)
app.use('/tourist',is_auth,touristRoute)
app.use('/admin',is_auth,is_admin,adminRoute)


app.use((error,req, res, next) =>{
  console.log(error)
  res.json({message:error.message})
})
sequelize
  .sync({ force: false })
  .then(app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
