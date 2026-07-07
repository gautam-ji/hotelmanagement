import reviewModel from "../models/reviewModel.js";
import listModel from "../models/listModel.js";
import mongoose from "mongoose";

const createReview = async (req, res) => {
  try {
    const { userId, ListingId, comment, rating } = req.body;

    if (!userId || !ListingId || !comment || !rating) {
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

    const newReview = new reviewModel({
      user: userId,
      listing: ListingId,
      comment: comment,
      rating: Number(rating),
    });

    if (rating < 1 || rating > 5) {
      return res.json({
        success: false,
        message: "Rating should be between 1 to 5",
      });
    }

    await newReview.save();

    //Recalculate average rating
    const reviews = await reviewModel.find({ listing: ListingId });

    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await listModel.findByIdAndUpdate(ListingId, { rating: avgRating });

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

    if (!reviewId || !rating || !comment) {
      return res.json({ success: false, message: "all fields are required" });
    }

    const reviewData = {
      rating: Number(rating),
      comment: comment,
    };

    const newReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      reviewData,
      { returnDocument: "after" },
    );

    await newReview.save();

    return res.json({
      success: true,
      message: "Review Update Successfully ",
      newReview,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Id is required" });
    }

    const deletreview = await reviewModel.findByIdAndDelete(id);

    return res.json({ success: true, message: "review Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { createReview, updateReview, deleteReview };
