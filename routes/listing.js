// const express= require('express');
// const router = express.Router();
// const Listing = require('../models/listing.js');
// const wrapAsync = require('../utils/wrapAsync.js');
// const ExpressError = require('../utils/ExpressError.js');
// const {listingSchema} = require('../schema.js');

// const validateListing = (req, res, next) => {
//   const { error } = listingSchema.validate(req.body);
//   if (error) {
//     throw new ExpressError(400, error.details.map(el => el.message).join(","));
//   }
//   next();
// };

// //index route to show all listings
// router.get('/',async(req,res)=>{
//   const allListings= await Listing.find({})
//   res.render("./listings/index.ejs",{allListings});
// });

// //new route
// router.get('/new',(req,res)=>{
//   res.render("./listings/new.ejs");
// });

// //show route
// router.get('/:id',wrapAsync(async(req,res)=>{
//   const {id} = req.params;
//   const listing = await Listing.findById(id).populate('reviews');
//   if(!listing){
//     req.flash('error','listing you requested does not exist');
//     res.redirect('/listings');
//   }
//   res.render("./listings/show.ejs",{listing});
// }));

// //create route
// router.post('/',validateListing,wrapAsync(async(req,res,next)=>{
//   let result=listingSchema.validate(req.body)
//   console.log(result);
//   if(result.err){
//     throw new ExpressError(400,result.err)
//   }
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();

//     req.flash('success','New listing created');

//     res.redirect("/listings");
// })
// );

// //edit route
// router.get('/:id/edit',wrapAsync(async(req,res)=>{
//   const {id} = req.params;
//   const listing = await Listing.findById(id);
//   if(!listing){
//     req.flash('error','listing you requested does not exist');
//     res.redirect('/listings');
//   }
//   req.flash('success','listing updated!');
//   res.render("listings/edit.ejs",{listing});
// }));

// //update route
// router.put('/:id',validateListing,wrapAsync(async(req,res)=>{
  
//   const {id} = req.params;
//   await Listing.findByIdAndUpdate(id,{...req.body.listing});
//   req.flash('success','listing updated!');
//   res.redirect(`/listings/${id}`);
// }));


// //delete route
// router.delete('/:id',wrapAsync(async(req,res)=>{
//   const {id} = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   req.flash('success','listing deleted!');
//   res.redirect('/listings');
// }));

// module.exports = router;


const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../schema.js');

// validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

// INDEX — show all listings
router.get('/', wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// NEW — form
router.get('/new', (req, res) => {
  res.render("listings/new.ejs");
});

// SHOW — one listing
router.get('/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate('reviews');

  if (!listing) {
    req.flash('error', 'Listing you requested does not exist');
    return res.redirect('/listings');
  }

  res.render("listings/show.ejs", { listing });
}));

// CREATE
router.post('/', validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();

  req.flash('success', 'New listing created successfully!');
  return res.redirect('/listings');
}));

// EDIT — form
router.get('/:id/edit', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash('error', 'Listing you requested does not exist');
    return res.redirect('/listings');
  }

  res.render("listings/edit.ejs", { listing });
}));

// UPDATE
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  req.flash('success', 'Listing updated successfully!');
  res.redirect(`/listings/${id}`);
}));

// DELETE
router.delete('/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash('success', 'Listing deleted successfully!');
  res.redirect('/listings');
}));

module.exports = router;
