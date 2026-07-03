import express from "express";
import {
  addList,
  getAllLIstings,
  getSinglelist,
  updateList,
  removeListing,
  searchListing,
  filterListing,
  getHostListings,
} from "../controller/listController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const listRouter = express.Router();

listRouter.post(
  "/add",authAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addList,
);
listRouter.get("/alllist", authAdmin,getAllLIstings);
listRouter.get("/singlelist/:id",authAdmin, getSinglelist);
listRouter.post("/update/:id",authAdmin, updateList);
listRouter.post("/remove/:id",authAdmin, removeListing);
listRouter.post("/searchlisting", searchListing);
listRouter.post("/filterlist", filterListing);
listRouter.get("/hostlist", getHostListings);

export default listRouter;
