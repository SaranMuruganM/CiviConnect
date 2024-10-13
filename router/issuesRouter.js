import { Router } from "express";
import {
  createIssue,
  getIssuesById,
  getIssuesByCity,
  updateIssue,
  deleteIssue,
} from "../controller/issuesController.js";
import { authorizeUserOrAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
const router = Router();

router.get("/",getIssuesById)
router.post("/",upload.single("issueImage"),createIssue)
router.route("/:id").patch(authorizeUserOrAdmin,updateIssue).delete(authorizeUserOrAdmin,deleteIssue);
router.get("/city/:city", getIssuesByCity);
export default router;