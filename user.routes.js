const Router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken');
// const db = require('.')
const User = require('../model/user');
//const {adminAuth, userAuth} = require('../middleware/auth');
const auth = require('../middleware/auth');

Router.post('/register', async (req,res) => {
  try{
    const {firstname, lastname, emailid, password, grouproleid, depotcode, ptoid,role} = req.body;
    if(!(firstname && lastname && emailid && password && grouproleid && depotcode && ptoid && role)) {
      res.status(400).send("All Inputs are required");
    }
    const oldUser = await User.findOne({where: {emailid}});
    if(oldUser){
      return res.status(409).send("User Already Exist. Please Login")
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    // const token = jwt.sign(
    //   { emailid },
    //   process.env.TOKEN_KEY,
    //   // {
    //   //   expiresIn: "2h",
    //   // }
    // );
    await User.create({firstname, lastname, emailid: emailid.toLowerCase(), password: encryptedPassword, grouproleid, depotcode, ptoid, role});
    res.status(201).send({success: true, message: "Successfully Register"});
  } catch (err) {
    console.log(err);
  }
});
    
//     .then(() => {
//         res.message = 'User saved Succesfully!!';
//         res.status(200).json(res);

//     }).catch((err) => {
//         res.send(err);
//     })

// });
Router.post('/login', async (req,res) => {
  try {

  const { emailid, password } = req.body;
  //   const user = await User.findOne({where:{emailid}});
  //   const match = await bcrypt.compare(password,user.password)
  //   if(!match) return res.status(400).json({message: "Wrong Password"});
  //   const accessToken = jwt.sign(
  //     {
  //       user_id: user.id, emailid
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,{
  //       expiresIn: '2h'
  //     });

  //     const refreshToken = jwt.sign({
  //       user_id: user.id, emailid
  //     },
  //     process.env.REFRESH_TOKEN_SECRET,{
  //       expiresIn: '1d'
  //     });
  //     //update token
  //     await User.update({refresh_token: refreshToken},{
  //       where: {id: user_id}
  //     });
  //     res.cookie('refreshToken', refreshToken,{
  //       httpOnly: true,
  //       maxAge: 24*60*60*1000
  //     });
  //     res.json({accessToken});
  //   } catch (error){
  //     res.status(404).json({message: 'Email not found'});
  //   }
  // });

    if (!(emailid && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ where: {emailid} });
    if (user && (await bcrypt.compare(password, user.password))) {
   //create token
      const token = jwt.sign(
        { user_id: user.id, emailid },
        // process.env.TOKEN_KEY,
        //  {
        //    expiresIn: "2h",
        // }
      );
        //save user token 
        user.token = token ;
        res.status(200).json({login: true , token});

      // return res.status(200).send({
      //   login: true,
      //   token
      // });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
})

Router.get('/getall' , (req,res) => {
    User.findAll()
    .then((list) => {
        //res.message = '!';
        
        res.status(200).send(list);

    }).catch((err) => {
        res.send(204).send(err);
    })

});

Router.put('/update', auth, (req,res) => {
  res.status(200).send("Welcome");
})

// Router.put('/update',adminAuth(['admin']) ,(req,res) =>{
//   res.json({success: true})
// });

// Router.delete('/delete', adminAuth('admin') , (req,res)=>{
// res.json({success: true})
// });




//Router.route("/update").put(adminAuth, update);
//Router.route("/deleteUser").delete(adminAuth, deleteUser);
// Router.put('/update', async (req,res,next)=>{
//   const {role, id } = req.body
//   if(role && id){
//     if (role === 'admin'){
//       await User.findByPk(id)
//       .then((user)=>{
//         data.update({username, emailid, password, grouproleid, depotcode, ptoid,role})
//         .then(()=>{
//           res.message =  "Data Updated Successfully";
//           res.send(res);
//         })
//         .catch((errors)=>{
//           res.status(500).send(errors);
//         });
//       })
//       .catch((err)=>{
//         res.message="no record found";
//       })
//     }
//     else{
//       res.status(400).json({
//         message: 'Role is not admin',
//       })
//     }
//   }else{
//     res.status(400).json({
//       message: "Role or Id not present"
//     })
//   }
// });



module.exports = Router