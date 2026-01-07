const express= require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema} = require('../schema.js');

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details.map(el => el.message).join(","));
  }
  next();
};

//index route to show all listings
router.get('/',async(req,res)=>{
  const allListings= await Listing.find({})
  res.render("./listings/index.ejs",{allListings});
});

//new route
router.get('/new',(req,res)=>{
  res.render("./listings/new.ejs");
});

//show route
router.get('/:id',wrapAsync(async(req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id).populate('reviews');
  res.render("./listings/show.ejs",{listing});
}));

//create route
router.post('/',validateListing,wrapAsync(async(req,res,next)=>{
  let result=listingSchema.validate(req.body)
  console.log(result);
  if(result.err){
    throw new ExpressError(400,result.err)
  }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
);

//edit route
router.get('/:id/edit',wrapAsync(async(req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
}));

//update route
router.put('/:id',validateListing,wrapAsync(async(req,res)=>{
  
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
}));


//delete route
router.delete('/:id',wrapAsync(async(req,res)=>{
  const {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect('/listings');
}));

module.exports = router;