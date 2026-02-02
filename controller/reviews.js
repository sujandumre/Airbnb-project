const Listing= require('../models/listing.js');
const Review =require('../models/reviews.js');

module.exports.createReview =async(req,res)=>{
  let listing=await Listing.findById(req.params.id);
  let review = new Review(req.body.review);
  review.author = req.user._id;

  listing.reviews.push(newReview);

  await review.save();
  await listing.save();
req.flash('success','New review created');
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview =async(req,res)=>{
  let {id,reviewId}= req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash('success','Review deleted!');
  res.redirect(`/listings/${id}`);
};


