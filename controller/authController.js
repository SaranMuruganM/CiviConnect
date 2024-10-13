import User from "../models/userModel.js";


export const register = async (req, res) => {
  try {
    const isFirstUser = (await User.countDocuments()) === 0;
    req.body.role = isFirstUser ? "admin" : "user";

    if (!isFirstUser) {
      const { email } = req.body;

   
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(409)
          .json({ msg: "User already exists with this email" });
      }
    }
    const user = await User.create(req.body);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.cookie(
      "userData",
      JSON.stringify({
        id: user._id,
        role: user.role,
        name: user.username,
        city: user.city,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      }
    );

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


