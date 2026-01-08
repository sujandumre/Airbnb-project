const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
  res.send("GET for users route")
});

router.get('/:id',(req,res)=>{
  res.send("GET users id")
});

router.post('/',(req,res)=>{
  res.send("post for users")
});

router.delete('/:id',(req,res)=>{
  res.send("DELETE for  users id")
});

module.exports = router;