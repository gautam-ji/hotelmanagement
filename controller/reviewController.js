import reviewModel from "../models/reviewModel.js";
import listModel from "../models/listModel.js";
import mongoose from "mongoose";

const updateAverageRating = async (listingId) => {
  const reviews = await reviewModel.find({ listing: listingId });

  const avg =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await listModel.findByIdAndUpdate(listingId, { rating: avg });
};

const createReview = async (req, res) => {
  try {
    const { ListingId, comment, rating } = req.body;
     
    const userId = req.user.id

    if ( !userId ||!ListingId || !comment || !rating) {
      return res.json({ success: false, message: "Required All fields" });
    }

    const listing = await listModel.findById(ListingId);

    if (!listing) {
      return res.json({ success: false, message: "Listing not found" });
    }

    const existingReview = await reviewModel.findOne({
      user: userId,
      listing: ListingId,
    });

    if (existingReview) {
      return res.json({
        success: false,
        message: "you Already reviewed this listing",
      });
    }
    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.json({
        success: false,
        message: "Rating should be between 1 to 5",
      });
    }

    const newReview = new reviewModel({
      user: userId,
      listing: ListingId,
      comment: comment,
      rating: Number(rating),
    });

    await newReview.save();

    await updateAverageRating(ListingId);

    return res.json({
      success: true,
      message: "Review Created Successfully",
      newReview,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId, rating, comment } = req.body;

    if (!reviewId) {
      return res.json({ success: false, message: "id is required" });
    }

    const reviewData = {
      rating: Number(rating),
      comment: comment,
    };

    const updatedReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      reviewData,
      { new: true },
    );

    if (!updatedReview) {
    return  res.json({ success: false, message: "Review not found" });
    }

    await updateAverageRating(updatedReview.listing);

    return res.json({
      success: true,
      message: "Review Update Successfully ",
      updatedReview,
    });
  } catch (error) {
    console.error(error);
   return res.json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const {id} =  req.body;

    if (!id) {
      return res.json({ success: false, message: "Id is required" });
    }

    const deletedReview = await reviewModel.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.json({
        success: false,
        message: "Review not fund",
      });
    }

    await updateAverageRating(deletedReview.listing);

    return res.json({ success: true, message: "review Deleted Successfully" });
  } catch (error) {
    console.error(error);
  return  res.json({ success: false, message: error.message });
  }
};

export { createReview, updateReview, deleteReview };
