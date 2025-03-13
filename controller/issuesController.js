import Issue from "../models/issueModel.js";
export const getIssuesById = async (req, res) => {
  try {
    let userData = req.cookies?.userData;
    userData = JSON.parse(userData);

    const userId = userData?.id;
    const userCity = userData?.city;
    const isAdmin = userData?.role === "admin"; // Assuming the user's role is stored in userData

    let issues = [];

    if (isAdmin) {
      // If the user is an admin, fetch all issues from the same city
      issues = await Issue.find({ city: userCity }).populate("createdBy");
    } else {
      // If the user is not an admin, fetch issues created by the user
      issues = await Issue.find({ createdBy: userId }).populate("createdBy");
    }

    // Calculate counts based on issue status
    const pendingCount = issues.filter(
      (issue) => issue.status === "pending"
    ).length;
    const resolvedCount = issues.filter(
      (issue) => issue.status === "resolved"
    ).length;
    const ongoingCount = issues.filter(
      (issue) => issue.status === "ongoing"
    ).length;

    // Return the issues and their counts
    return res.status(200).json({
      totalIssues: issues.length,
      pending: pendingCount,
      resolved: resolvedCount,
      ongoing: ongoingCount,
      data: issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const updateIssue = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Issue ID is required" });
  }

  try {
    const updatedIssue = await Issue.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedIssue) {
      return res.status(404).json({ msg: "Issue not found" });
    }

    return res
      .status(200)
      .json({ msg: "Issue updated successfully", data: updatedIssue });
  } catch (error) {
    console.error("Error updating issue:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while updating issue" });
  }
};

export const deleteIssue = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "Issue ID is required" });
  }

  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);

    if (!deletedIssue) {
      return res.status(404).json({ msg: "Issue not found" });
    }

    return res.status(200).json({ msg: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while deleting issue" });
  }
};

export const getIssuesByCity = async (req, res) => {
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ msg: "City parameter is required" });
  }

  try {
    const issues = await Issue.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (!issues.length) {
      return res
        .status(404)
        .json({ msg: `No issues found for the city: ${city}` });
    }

    const pendingCount = issues.filter(
      (issue) => issue.status === "pending"
    ).length;
    const resolvedCount = issues.filter(
      (issue) => issue.status === "resolved"
    ).length;
    const ongoingCount = issues.filter(
      (issue) => issue.status === "ongoing"
    ).length;

    return res.status(200).json({
      totalIssues: issues.length,
      pending: pendingCount,
      resolved: resolvedCount,
      ongoing: ongoingCount,
      data: issues,
    });
  } catch (error) {
    console.error("Error fetching issues by city:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while fetching issues by city" });
  }
};

export const createIssue = async (req, res) => {
  try {
    const { problem, description, city, latitude, longitude } = req.body;

    // Check if all required fields are present
    if (!problem || !description || !city || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse the userData cookie
    const userData = JSON.parse(req.cookies?.userData || "{}"); // Make sure to handle undefined case
    const createdBy = userData.id; // Access the id property from the parsed userData

    console.log("Created By:", createdBy); // Log createdBy to ensure it's defined

    // Check if createdBy is present
    if (!createdBy) {
      return res.status(400).json({ message: "User not authenticated." });
    }

    // Handle image upload if an image is provided
    let imageUrl = null;
    console.log(req.file);
    if (req.file) {
      console.log("file is included");
      try {
        // Upload the image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "issues" }, // Optional folder in Cloudinary to organize the uploads
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(req.file.buffer); // Send image buffer from multer to Cloudinary
        });

        imageUrl = result.secure_url; // Get the URL of the uploaded image from Cloudinary
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading image." });
      }
    }

    // Create a new issue object
    const newIssue = new Issue({
      problem,
      description,
      city,
      latitude,
      longitude,
      createdBy,
      imageUrl,
    });

    await newIssue.save();

    return res.status(201).json({
      message: "Issue created successfully.",
      issue: newIssue,
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
