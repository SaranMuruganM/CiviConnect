import { json } from "express";
import Issue from "../models/issueModel.js";

export const checkLoggedIn = (req, res, next) => {
  try {
    let userData = req.cookies?.userData;

    if (!userData) {
      return res.status(401).json({ msg: "Unauthorized. Please log in." });
    }

    userData = JSON.parse(userData);
    req.userData = userData;

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Invalid user data. Please log in again." });
  }
};


export const authorizeUserOrAdmin = async (req, res, next) => {
  let userData = req.cookies?.userData;
  userData = JSON.parse(userData)
  try {
    console.log("trigger")
    const userId =userData.id; // Get user ID from cookie
    const userRole = userData.role; // Get user role from cookie
    const { id } = req.params; // Get issue ID from params

    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized. Please log in." });
    }

    // Find the issue
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ msg: "Issue not found" });
    }

    // Check if the user is the creator of the issue or an admin
    if (issue.createdBy.toString() !== userId && userRole !== "admin") {
      return res
        .status(403)
        .json({ msg: "You are not authorized to modify this issue." });
    }

    // If authorized, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ msg: "Server error during authorization." });
  }
};
