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
listRouter.get("/alllist", getAllLIstings);
listRouter.get("/singlelist", getSinglelist);
listRouter.post("/update", updateList);
listRouter.post("/remove", removeListing);
listRouter.post("/searchlisting", searchListing);
listRouter.post("/filterlist", filterListing);
listRouter.get("/hostlist", getHostListings);

export default listRouter;
