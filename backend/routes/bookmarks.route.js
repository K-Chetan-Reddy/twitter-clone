import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteBookmarks, getBookmarks ,addBookmarks} from "../controllers/bookmarks.controller.js";
const router = express.Router();

router.post("/", protectRoute, addBookmarks);
router.delete("/:id", protectRoute, deleteBookmarks);
router.get("/", protectRoute, getBookmarks);

export default router;