const express=require('express');
const app=express();
const path=require('path');
const userModel =require('./models/user');
const { name } = require('ejs');


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"/pulbic")))

app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/read',async (req,res)=>{
    const allusers= await userModel.find();
    res.render("read", {users:allusers})
})

app.get('/delete/:id',async (req,res)=>{
    await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read")
})

app.get('/edit/:id',async (req,res)=>{
    let user= await userModel.findOne({_id:req.params.id});
    res.render("edit",{user})
})

app.post('/update/:id',async (req,res)=>{
    let{Name,Email,imgurl}=req.body;
    let updatedusers= await userModel.findOneAndUpdate({_id:req.params.id},{Name,Email,imgurl},{new:true});
    res.redirect("/read")
})


app.post('/create',async(req,res)=>{
    let{Name,Email,imgurl}=req.body;
    let createduser=await userModel.create({
        Name,
        Email,
        imgurl
    })
    res.redirect("/read");
})

app.listen(3000,()=>{
    console.log("Listening");
})
// const userModel=require('./usermodel')
// app.get('/create',async (req,res)=>{
//     let createduser=await userModel.create({
//         name:"wajidaaa",
//         email:"Wajid@gmail.com",
//         username:"wajidaa"
//     })
//     res.send(createduser);
// })

// app.get('/update',async (req,res)=>{
//    let updateuser=await userModel.findOneAndUpdate({username:"harsh"},{name:"abrar"},{new:true})
//     res.send(updateuser);
// })

// app.get('/delete',async (req,res)=>{
//     let updateuser=await userModel.findOneAndDelete({username:"wajidaa"})
//      res.send(updateuser.name+ "u are deleted");
//  })

// app.get('/read',async (req,res)=>{
//     let users=await userModel.find();
//      res.send(users);
//  })