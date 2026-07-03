import listModel from "../models/listModel.js";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

//add Listing
const addList = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      price,
      guest,
      bedroom,
      bathroom,
      bed,
      location,
      propertyType,
      rating,
    } = req.body;

    const ownerId = req.user.id;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const AllImage = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    const imagesUrl = AllImage.map((file) => file.path);

    const createList = {
      title: title,
      description: description,
      images: imagesUrl,
      price: Number(price),
      guest: Number(guest),
      bedroom: Number(bedroom),
      bathroom: Number(bathroom),
      bed: Number(bed),
      location: location,
      propertyType: propertyType,
      rating: Number(rating),
      owner: ownerId,
    };
    console.log("ownerId");
    console.log(ownerId);

    const newListing = listModel(createList);
    await newListing.save();

    res.json({ success: true, newListing });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
//Get All Listings
const getAllLIstings = async (req, res) => {
  try {
    const allList = await listModel
      .find({})
      .populate("owner", "userName email");

    return res.json({ success: true, allList });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Single List
const getSinglelist = async (req, res) => {
  try {
    // const {id} = req.params;
    const singleList = await listModel.findById(req.params.id);

    res.json({ success: true, singleList });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//update Listing
const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    // const { updates } = req.body;
    const updateList = await listModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate("owner", "userName email");

    if (!updateList) {
      return res.json({ success: false, message: "List not found " });
    }

    res.json({
      success: true,
      message: "List Update Successfully",
      updateList,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//removeListing
const removeListing = async (req, res) => {
  try {
    const removeList = await listModel.findByIdAndDelete(req.params.id);

    if (!removeList) {
      return res.json({ success: false, message: "List not found " });
    }

    return res.json({ success: true, message: "List remove Successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Search Listing
const searchListing = async (req, res) => {
  try {
    const { keyword } = req.query;

    let query = {};

    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { location: { $regrex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const Listings = await listModel
      .find(query)
      .populate("owner", "userName email");

    return res.json({
      success: true,
      message: "Search result fetched successfully",
      count: Listings.length,
      data: Listings,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//Filter Listing
const filterListing = async (req, res) => {};

//Get HostListing
const getHostListings = async (req, res) => {};

export {
  addList,
  getAllLIstings,
  getSinglelist,
  updateList,
  removeListing,
  searchListing,
  filterListing,
  getHostListings,
};
