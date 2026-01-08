
const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
  res.send("GET for posts route")
});

router.get('/:id',(req,res)=>{
  res.send("POST posts id")
});

router.post('/',(req,res)=>{
  res.send("post for posts")
});

router.delete('/:id',(req,res)=>{
  res.send("DELETE for  posts id")
});

module.exports= router;