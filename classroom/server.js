const express=require('express');
const app=express();
const users=require("./routes/user.js");
const posts =require("./routes/post.js");
const cookieParser = require('cookie-parser');

app.use(cookieParser("secretcode"));

app.use('/getsignedcookie',(req,res)=>{
  res.cookie("color","red",{signed:true});
  res.send("done!");
});

app.get('/verify',(req,res)=>{
  console.log(req.signedCookies);
  // res.send(req.signedCookies);
  res.send("verifyied!");
});

app.get("/getcookies",(req,res)=>{
  res.cookie("greet","namaste");
  res.cookie("MadeIn","Nepal");

  res.send("sent you some cookies!");
});

app.get("/greet",(req,res)=>{
  let {name="anonymous"}=req.cookies;
  res.send(`hello ${name}`);
});

app.get("/",(req,res)=>{
  console.dir(req.cookies);
  res.send("hi, i am root!");
});
app.use("/users",users);
app.use("/posts",posts);

app.listen(3000,()=>{
  console.log("server is listening to 3000");
});